import { Module } from '@nestjs/common';

import { CreateOrganizationUseCase } from '@/domain/saas/application/use-cases/orgs/create-organization';

import { CreateOrganizationController } from './create-organization.controller';
import { GetUserMembershipController } from './get-user-membership.controller';

@Module({
	controllers: [CreateOrganizationController, GetUserMembershipController],
	providers: [CreateOrganizationUseCase],
})
export class OrganizationModule {}
