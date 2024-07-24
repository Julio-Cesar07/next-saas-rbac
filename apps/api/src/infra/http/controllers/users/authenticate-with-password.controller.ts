import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { InvalidCredentialError } from '@/core/errors/invalid-credential-error';
import { AuthenticateWithPasswordUseCase } from '@/domain/saas/application/use-cases/user/authenticate-with-password';

import {
	AuthenticateWithPasswordDto,
	authenticateWithPasswordValidation,
} from '../../dtos/authenticate-with-password-dto';

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
	@HttpCode(200)
	async handle(
		@Body(authenticateWithPasswordValidation) body: AuthenticateWithPasswordDto
	) {
		const result = await this.authenticateWithPasswordUseCase.execute(body);

		if (result.isLeft()) {
			if (result.value instanceof InvalidCredentialError)
				throw new UnauthorizedException(
					result.value.name,
					result.value.message
				);
			throw new BadRequestException(result.value.name, result.value.message);
		}

		return {
			token: result.value.token,
		};
	}
}
