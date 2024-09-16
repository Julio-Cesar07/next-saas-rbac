import { Injectable } from '@nestjs/common';

import { Either, right } from '@/core/use-cases/either';
import { UseCase } from '@/core/use-cases/use-case';
import { Token } from '@/domain/saas/enterprise/entities/token';

import { TokenRepository } from '../../repositories/token-repository';
import { UserRepository } from '../../repositories/user-repository';

interface RequestPasswordRecoverUseCaseRequest {
	email: string;
}

type RequestPasswordRecoverUseCaseResponse = Either<null, null>;

@Injectable()
export class RequestPasswordRecoverUseCase
	implements
		UseCase<
			RequestPasswordRecoverUseCaseRequest,
			RequestPasswordRecoverUseCaseResponse
		>
{
	constructor(
		private userRepository: UserRepository,
		private tokenRepository: TokenRepository
	) {}

	async execute({
		email,
	}: RequestPasswordRecoverUseCaseRequest): Promise<RequestPasswordRecoverUseCaseResponse> {
		const userFromEmail = await this.userRepository.findUniqueEmail(email);

		if (!userFromEmail) return right(null);

		const token = Token.create({
			type: 'PASSWORD_RECOVER',
			userId: userFromEmail.id,
		});

		await this.tokenRepository.create(token);

		// Enviar por email
		console.log(token.id);

		return right(null);
	}
}
