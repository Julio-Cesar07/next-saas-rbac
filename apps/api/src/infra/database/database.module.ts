import { Module } from '@nestjs/common';

import { OrganizationRepository } from '@/domain/saas/application/repositories/organization-repository';

import { UserRepository } from '../../domain/saas/application/repositories/user-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaOrganizationRepository } from './prisma/repositories/prisma-organization-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
	providers: [
		PrismaService,
		{
			provide: UserRepository,
			useClass: PrismaUserRepository,
		},
		{
			provide: OrganizationRepository,
			useClass: PrismaOrganizationRepository,
		},
	],
	exports: [PrismaService, UserRepository, OrganizationRepository],
})
export class DatabaseModule {}
