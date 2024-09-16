import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthenticateWithGithubUseCase } from '@/domain/saas/application/use-cases/user/authenticate-with-github';

import {
	AuthenticateWithGithubDto,
	AuthenticateWithGithubResponse,
	authenticateWithGithubValidation,
} from '../../dtos/authenticate-with-github.dto';
import { ApiErrorDecorator } from '../_errors/api-error-decorator';

@Controller('sessions/github')
export class AuthenticateWithGithubController {
	constructor(
		private readonly authenticateWithGithubUseCase: AuthenticateWithGithubUseCase
	) {}

	@Post()
	@ApiOperation({
		summary: 'Authenticate with Github',
		tags: ['auth'],
	})
	@ApiErrorDecorator([409])
	async handle(
		@Body(authenticateWithGithubValidation) body: AuthenticateWithGithubDto
	): Promise<AuthenticateWithGithubResponse> {
		const result = await this.authenticateWithGithubUseCase.execute(body);

		if (result.isLeft()) throw result.value;

		return {
			token: result.value.token,
		};
	}
}
