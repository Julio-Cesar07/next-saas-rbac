import { Injectable } from '@nestjs/common';

import { OrganizationRepository } from '@/domain/saas/application/repositories/organization-repository';
import { Organization } from '@/domain/saas/enterprise/entities/organization';

import { PrismaOrganizationMapper } from '../mappers/prisma-organization-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
	constructor(private prisma: PrismaService) {}

	async create(organization: Organization): Promise<void> {
		const data = PrismaOrganizationMapper.toPrisma(organization);

		await this.prisma.organization.create({
			data,
		});
	}

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

	async findManySlugByHyphenatedOrganizationName(
		organizationName: string
	): Promise<string[]> {
		const slugsAlreadyUsed = await this.prisma.organization.findMany({
			where: {
				slug: {
					startsWith: organizationName + '-',
				},
			},
			select: {
				slug: true,
			},
		});

		return slugsAlreadyUsed.map((slugUsed) => slugUsed.slug);
	}
}
