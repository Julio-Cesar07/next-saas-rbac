import { Injectable } from '@nestjs/common';

import { EntityAlreadyExistError } from '@/core/errors/entity-already-exist-error';
import { type Either, left, right } from '@/core/use-cases/either';
import { UseCase } from '@/core/use-cases/use-case';
import { Member } from '@/domain/saas/enterprise/entities/member';
import { User } from '@/domain/saas/enterprise/entities/user';

import { Hash } from '../../cryptography/hash';
import { OrganizationRepository } from '../../repositories/organization-repository';
import { UserRepository } from '../../repositories/user-repository';

type CreateAccountUseCaseRequest = {
	name: string;
	email: string;
	password: string;
};

type CreateUseCaseResponse = Either<EntityAlreadyExistError, null>;

@Injectable()
export class CreateAccountUseCase
	implements UseCase<CreateAccountUseCaseRequest, CreateUseCaseResponse>
{
	constructor(
		private userRepository: UserRepository,
		private organizationRepository: OrganizationRepository,
		private hash: Hash
	) {}

	async execute({
		email,
		name,
		password,
	}: CreateAccountUseCaseRequest): Promise<CreateUseCaseResponse> {
		const userWithSameEmail = await this.userRepository.findUniqueEmail(email);

		if (userWithSameEmail) return left(new EntityAlreadyExistError());

		const passwordHash = await this.hash.generator(password);

		const [, domain] = email.split('@');

		const autoJoinOrganization =
			await this.organizationRepository.findUniqueDomain(domain);

		const user = User.create({
			email,
			name,
			passwordHash,
		});

		const member = autoJoinOrganization
			? Member.create({
					organizationId: autoJoinOrganization.id,
					userId: user.id,
				})
			: undefined;

		await this.userRepository.create(user, member);

		return right(null);
	}
}
