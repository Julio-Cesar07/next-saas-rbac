import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthenticateWithPasswordUseCase } from '@/domain/saas/application/use-cases/user/authenticate-with-password';

import {
	AuthenticateWithPasswordDto,
	AuthenticateWithPasswordResponse,
	authenticateWithPasswordValidation,
} from '../../dtos/authenticate-with-password-dto';
import { ApiErrorDecorator } from '../_errors/api-error-decorator';

@Controller('sessions/password')
export class AuthenticateWithPasswordController {
	constructor(
		private readonly authenticateWithPasswordUseCase: AuthenticateWithPasswordUseCase
	) {}

	@Post()
	@ApiOperation({
		summary: 'Authenticate with e-mail & password',
		tags: ['auth'],
	})
	@ApiErrorDecorator([400, 401])
	async handle(
		@Body(authenticateWithPasswordValidation) body: AuthenticateWithPasswordDto
	): Promise<AuthenticateWithPasswordResponse> {
		const result = await this.authenticateWithPasswordUseCase.execute(body);

		if (result.isLeft()) throw result.value;

		return {
			token: result.value.token,
		};
	}
}
