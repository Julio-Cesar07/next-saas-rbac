import type { Organization, Prisma } from '@prisma/client';

import { Slug } from '@/domain/saas/enterprise/entities/value-objects/slug';

import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import { Organization as RawOrganization } from '../../../../domain/saas/enterprise/entities/organization';

export class PrismaOrganizationMapper {
	static toPrisma(
		organization: RawOrganization
	): Prisma.OrganizationUncheckedCreateInput {
		return {
			name: organization.name,
			ownerId: organization.ownerId.toString(),
			slug: organization.slug.value,
			avatarUrl: organization.avatarUrl,
			createdAt: organization.createdAt,
			updatedAt: organization.updatedAt,
			domain: organization.domain,
			id: organization.id.toString(),
			shouldAttachUserByDomain: organization.shouldAttachUserByDomain,
			members: {
				create: {
					userId: organization.ownerId.toString(),
					role: 'ADMIN',
				},
			},
		};
	}

	static toDomain(organization: Organization): RawOrganization {
		return RawOrganization.create(
			{
				name: organization.name,
				ownerId: new UniqueEntityId(organization.ownerId),
				slug: Slug.createFromText(organization.slug),
				avatarUrl: organization.avatarUrl,
				createdAt: organization.createdAt,
				updatedAt: organization.updatedAt,
				domain: organization.domain,
				shouldAttachUserByDomain: organization.shouldAttachUserByDomain,
			},
			new UniqueEntityId(organization.id)
		);
	}
}
