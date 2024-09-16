import { Injectable } from '@nestjs/common';

import { InvalidCredentialError } from '@/core/errors/invalid-credential-error';
import { Either, left, right } from '@/core/use-cases/either';
import { UseCase } from '@/core/use-cases/use-case';

import { Hash } from '../../cryptography/hash';
import { TokenRepository } from '../../repositories/token-repository';
import { UserRepository } from '../../repositories/user-repository';

interface ResetPasswordUseCaseRequest {
	code: string;
	password: string;
}

type ResetPasswordUseCaseResponse = Either<InvalidCredentialError, null>;

@Injectable()
export class ResetPasswordUseCase
	implements UseCase<ResetPasswordUseCaseRequest, ResetPasswordUseCaseResponse>
{
	constructor(
		private userRepository: UserRepository,
		private tokenRepository: TokenRepository,
		private hash: Hash
	) {}

	async execute({
		code,
		password,
	}: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
		const token = await this.tokenRepository.findById(code);

		if (!token) return left(new InvalidCredentialError());

		const user = await this.userRepository.findById(token.userId.toString());

		if (!user) return left(new InvalidCredentialError());

		const passwordHash = await this.hash.generator(password);

		user.passwordHash = passwordHash;

		await this.userRepository.save(user);

		return right(null);
	}
}
