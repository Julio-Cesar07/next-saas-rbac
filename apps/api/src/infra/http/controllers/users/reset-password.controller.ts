import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { ResetPasswordUseCase } from '@/domain/saas/application/use-cases/user/reset-password';

import {
	ResetPasswordDto,
	resetPasswordValidation,
} from '../../dtos/reset-password.dto';
import { ApiErrorDecorator } from '../_errors/api-error-decorator';

@Controller('password/reset')
export class ResetPasswordController {
	constructor(private readonly resetPasswordUseCase: ResetPasswordUseCase) {}

	@Post()
	@ApiOperation({
		summary: 'Reset password',
		tags: ['auth'],
	})
	@ApiErrorDecorator([401])
	@HttpCode(204)
	async handle(@Body(resetPasswordValidation) body: ResetPasswordDto) {
		const result = await this.resetPasswordUseCase.execute(body);

		if (result.isLeft()) throw result.value;
	}
}
