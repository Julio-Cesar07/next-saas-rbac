import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { RequestPasswordRecoverUseCase } from '@/domain/saas/application/use-cases/user/request-password-recover';

import {
	RequestPasswordRecoverDto,
	requestPasswordRecoverValidation,
} from '../../dtos/request-password-recover.dto';

@Controller('password/recover')
export class RequestPasswordRecoverController {
	constructor(
		private readonly requestPasswordRecoverUseCase: RequestPasswordRecoverUseCase
	) {}

	@Post()
	@ApiOperation({
		summary: 'Request password recover',
		tags: ['auth'],
	})
	async handle(
		@Body(requestPasswordRecoverValidation) body: RequestPasswordRecoverDto
	) {
		const result = await this.requestPasswordRecoverUseCase.execute(body);

		if (result.isLeft()) throw result.value;
	}
}
