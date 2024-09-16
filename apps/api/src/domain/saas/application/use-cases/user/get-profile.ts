import { Injectable } from '@nestjs/common';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { Either, left, right } from '@/core/use-cases/either';
import { UseCase } from '@/core/use-cases/use-case';
import { User } from '@/domain/saas/enterprise/entities/user';

import { UserRepository } from '../../repositories/user-repository';

interface GetProfileUseCaseRequest {
	userId: string;
}

type GetProfileUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		user: User;
	}
>;

@Injectable()
export class GetProfileUseCase
	implements UseCase<GetProfileUseCaseRequest, GetProfileUseCaseResponse>
{
	constructor(private userRepository: UserRepository) {}

	async execute({
		userId,
	}: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) return left(new ResourceNotFoundError('user'));

		return right({
			user,
		});
	}
}
