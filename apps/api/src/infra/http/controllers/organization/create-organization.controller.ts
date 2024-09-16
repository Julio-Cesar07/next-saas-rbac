import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateOrganizationUseCase } from '@/domain/saas/application/use-cases/orgs/create-organization';

import { Auth } from '../../auth/auth.decorator';
import { CurrentUser } from '../../auth/current-user-decorator';
import { TokenPayloadSchema } from '../../auth/jwt.strategy';
import {
	CreateOrganizationDto,
	CreateOrganizationResponse,
	createOrganizationValidation,
} from '../../dtos/create-organization.dto';
import { ApiErrorDecorator } from '../_errors/api-error-decorator';

@Controller('organization')
@Auth()
export class CreateOrganizationController {
	constructor(
		private readonly createOrganizationUseCase: CreateOrganizationUseCase
	) {}

	@Post()
	@ApiOperation({
		summary: 'Create a new organization',
		tags: ['organization'],
	})
	@ApiErrorDecorator([409])
	async handle(
		@CurrentUser() currentUser: TokenPayloadSchema,
		@Body(createOrganizationValidation) body: CreateOrganizationDto
	): Promise<CreateOrganizationResponse> {
		const result = await this.createOrganizationUseCase.execute({
			...body,
			ownerId: currentUser.sub,
		});

		if (result.isLeft()) throw result.value;

		return {
			organizationId: result.value.organizationId,
		};
	}
}
