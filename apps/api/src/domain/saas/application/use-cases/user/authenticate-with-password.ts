import { Injectable } from '@nestjs/common';

import { AccountDoesNotHavePassword } from '@/core/errors/account-does-not-have-password';
import { InvalidCredentialError } from '@/core/errors/invalid-credential-error';
import { Either, left, right } from '@/core/use-cases/either';
import { UseCase } from '@/core/use-cases/use-case';

import { Hash } from '../../cryptography/hash';
import { JwtEncrypter } from '../../cryptography/jwt';
import { UserRepository } from '../../repositories/user-repository';

interface AuthenticateWithPasswordUseCaseRequest {
	email: string;
	password: string;
}

export type AuthenticateWithPasswordUseCaseResponse = Either<
	InvalidCredentialError | AccountDoesNotHavePassword,
	{
		token: string;
	}
>;

@Injectable()
export class AuthenticateWithPasswordUseCase
	implements
		UseCase<
			AuthenticateWithPasswordUseCaseRequest,
			AuthenticateWithPasswordUseCaseResponse
		>
{
	constructor(
		private userRepository: UserRepository,
		private hash: Hash,
		private jwt: JwtEncrypter
	) {}

	async execute({
		email,
		password,
	}: AuthenticateWithPasswordUseCaseRequest): Promise<AuthenticateWithPasswordUseCaseResponse> {
		const userFromEmail = await this.userRepository.findUniqueEmail(email);

		if (!userFromEmail) return left(new InvalidCredentialError());
		if (!userFromEmail.passwordHash)
			return left(new AccountDoesNotHavePassword());

		const isPasswordValid = await this.hash.compare(
			password,
			userFromEmail.passwordHash
		);

		if (!isPasswordValid) return left(new InvalidCredentialError());

		const token = await this.jwt.signAccessToken({
			sub: userFromEmail.id.toString(),
		});

		return right({
			token,
		});
	}
}
