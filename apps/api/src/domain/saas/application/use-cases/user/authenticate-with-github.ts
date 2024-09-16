import { Injectable } from '@nestjs/common';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AccountNotHaveEmailExistError } from '@/core/errors/github-account-not-have-email-error';
import { Either, left, right } from '@/core/use-cases/either';
import { UseCase } from '@/core/use-cases/use-case';
import { Account } from '@/domain/saas/enterprise/entities/account';
import { User } from '@/domain/saas/enterprise/entities/user';

import { JwtEncrypter } from '../../cryptography/jwt';
import { GithubOAuth } from '../../oauth/github-oauth';
import { AccountRepository } from '../../repositories/account-repository';
import { UserRepository } from '../../repositories/user-repository';

interface AuthenticateWithGithubUseCaseRequest {
	code: string;
}

export type AuthenticateWithGithubUseCaseResponse = Either<
	AccountNotHaveEmailExistError,
	{
		token: string;
	}
>;

@Injectable()
export class AuthenticateWithGithubUseCase
	implements
		UseCase<
			AuthenticateWithGithubUseCaseRequest,
			AuthenticateWithGithubUseCaseResponse
		>
{
	constructor(
		private userRepository: UserRepository,
		private accountRepository: AccountRepository,
		private githubOAuth: GithubOAuth,
		private jwt: JwtEncrypter
	) {}

	async execute({
		code,
	}: AuthenticateWithGithubUseCaseRequest): Promise<AuthenticateWithGithubUseCaseResponse> {
		const userData = await this.githubOAuth.getUserData(code);

		if (!userData.email)
			return left(new AccountNotHaveEmailExistError('Github'));

		let user = await this.userRepository.findUniqueEmail(userData.email);

		if (!user) {
			user = User.create({
				email: userData.email,
				avatarUrl: userData.avatarUrl,
				name: userData.name,
			});
			await this.userRepository.create(user);
		}

		let account = await this.accountRepository.findByUserId(
			user.id.toString(),
			'GITHUB'
		);

		if (!account) {
			account = Account.create({
				provider: 'GITHUB',
				providerAccountId: new UniqueEntityId(String(userData.githubId)),
				userId: user.id,
			});
			await this.accountRepository.create(account);
		}

		const token = await this.jwt.signAccessToken({
			sub: user.id.toString(),
		});

		return right({
			token,
		});
	}
}
