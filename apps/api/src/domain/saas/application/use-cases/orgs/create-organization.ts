import { Injectable } from '@nestjs/common';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { EntityAlreadyExistError } from '@/core/errors/entity-already-exist-error';
import { Either, left, right } from '@/core/use-cases/either';
import { UseCase } from '@/core/use-cases/use-case';
import { Organization } from '@/domain/saas/enterprise/entities/organization';
import { Slug } from '@/domain/saas/enterprise/entities/value-objects/slug';

import { OrganizationRepository } from '../../repositories/organization-repository';

interface CreateOrganizationUseCaseRequest {
	name: string;
	domain?: string | null;
	shouldAttachUserByDomain: boolean;
	avatarUrl?: string | null;
	ownerId: string;
}

type CreateOrganizationUseCaseResponse = Either<
	EntityAlreadyExistError,
	{
		organizationId: string;
	}
>;

@Injectable()
export class CreateOrganizationUseCase
	implements
		UseCase<
			CreateOrganizationUseCaseRequest,
			CreateOrganizationUseCaseResponse
		>
{
	constructor(private organizationRepository: OrganizationRepository) {}

	async execute({
		name,
		ownerId,
		shouldAttachUserByDomain,
		avatarUrl,
		domain,
	}: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
		if (domain) {
			const organizationWithSameDomain =
				await this.organizationRepository.findUniqueDomain(domain);
			if (organizationWithSameDomain)
				return left(new EntityAlreadyExistError());
		}

		const slugsAlreadyUsed =
			await this.organizationRepository.findManySlugByHyphenatedOrganizationName(
				name
			);

		const organization = Organization.create({
			name,
			ownerId: new UniqueEntityId(ownerId),
			shouldAttachUserByDomain,
			slug: Slug.createUniqueFromText(
				name,
				slugsAlreadyUsed.map((slug) => Number(slug.split('-')[1]))
			),
			avatarUrl,
			domain,
		});

		await this.organizationRepository.create(organization);

		return right({
			organizationId: organization.id.toString(),
		});
	}
}
