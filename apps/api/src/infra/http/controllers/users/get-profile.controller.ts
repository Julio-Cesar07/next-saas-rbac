import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { JwtPayload } from '@/domain/saas/application/cryptography/jwt';
import { GetProfileUseCase } from '@/domain/saas/application/use-cases/user/get-profile';

import { Auth } from '../../auth/auth.decorator';
import { CurrentUser } from '../../auth/current-user-decorator';
import {
	UserPresenter,
	UserPresenterResponse,
} from '../../presenters/user.presenter';
import { ApiErrorDecorator } from '../_errors/api-error-decorator';

@Controller('profile')
@Auth()
export class GetProfileController {
	constructor(private readonly getprofileUseCase: GetProfileUseCase) {}

	@Get()
	@ApiOperation({
		summary: 'Get profile',
		tags: ['auth'],
	})
	@ApiErrorDecorator([404])
	async handle(
		@CurrentUser() currentUser: JwtPayload
	): Promise<UserPresenterResponse> {
		const result = await this.getprofileUseCase.execute({
			userId: currentUser.sub,
		});

		if (result.isLeft()) throw result.value;

		return {
			user: UserPresenter.toHttp(result.value.user),
		};
	}
}
