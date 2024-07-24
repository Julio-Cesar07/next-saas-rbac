import { Injectable } from '@nestjs/common';

import { OrganizationRepository } from '@/domain/saas/application/repositories/organization-repository';
import { Organization } from '@/domain/saas/enterprise/entities/organization';

import { PrismaOrganizationMapper } from '../mappers/prisma-organization-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
	constructor(private prisma: PrismaService) {}

	async findUniqueDomain(domain: string): Promise<Organization | null> {
		const organization = await this.prisma.organization.findUnique({
			where: {
				domain,
				shouldAttachUserByDomain: true,
			},
		});

		return organization
			? PrismaOrganizationMapper.toDomain(organization)
			: null;
	}
}
