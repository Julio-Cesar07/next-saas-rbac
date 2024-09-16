import { Module } from '@nestjs/common';

import { AccountRepository } from '@/domain/saas/application/repositories/account-repository';
import { MemberRepository } from '@/domain/saas/application/repositories/member-repository';
import { OrganizationRepository } from '@/domain/saas/application/repositories/organization-repository';
import { TokenRepository } from '@/domain/saas/application/repositories/token-repository';

import { UserRepository } from '../../domain/saas/application/repositories/user-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository';
import { PrismaMemberRepository } from './prisma/repositories/prisma-member-repository';
import { PrismaOrganizationRepository } from './prisma/repositories/prisma-organization-repository';
import { PrismaTokenRepository } from './prisma/repositories/prisma-token-repository';
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
		{
			provide: TokenRepository,
			useClass: PrismaTokenRepository,
		},
		{
			provide: AccountRepository,
			useClass: PrismaAccountRepository,
		},
		{
			provide: MemberRepository,
			useClass: PrismaMemberRepository,
		},
	],
	exports: [
		PrismaService,
		UserRepository,
		OrganizationRepository,
		TokenRepository,
		AccountRepository,
		MemberRepository,
	],
})
export class DatabaseModule {}
