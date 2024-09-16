import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateAccountUseCase } from '@/domain/saas/application/use-cases/user/create-account';

import {
	CreateAccountDto,
	createAccountValidation,
} from '../../dtos/create-account.dto';
import { ApiErrorDecorator } from '../_errors/api-error-decorator';

@Controller('users')
export class CreateAccountController {
	constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

	@Post()
	@ApiOperation({
		summary: 'Create a new account',
		tags: ['auth'],
	})
	@ApiErrorDecorator([409])
	async handle(@Body(createAccountValidation) body: CreateAccountDto) {
		const result = await this.createAccountUseCase.execute(body);

		if (result.isLeft()) throw result.value;
	}
}
