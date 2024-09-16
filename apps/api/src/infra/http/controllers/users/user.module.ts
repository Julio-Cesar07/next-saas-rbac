import { Module } from '@nestjs/common';

import { AuthenticateWithGithubUseCase } from '@/domain/saas/application/use-cases/user/authenticate-with-github';
import { AuthenticateWithPasswordUseCase } from '@/domain/saas/application/use-cases/user/authenticate-with-password';
import { CreateAccountUseCase } from '@/domain/saas/application/use-cases/user/create-account';
import { GetProfileUseCase } from '@/domain/saas/application/use-cases/user/get-profile';
import { RequestPasswordRecoverUseCase } from '@/domain/saas/application/use-cases/user/request-password-recover';
import { ResetPasswordUseCase } from '@/domain/saas/application/use-cases/user/reset-password';

import { AuthenticateWithGithubController } from './authenticate-with-github.controller';
import { AuthenticateWithPasswordController } from './authenticate-with-password.controller';
import { CreateAccountController } from './create-account.controller';
import { GetProfileController } from './get-profile.controller';
import { RequestPasswordRecoverController } from './request-password-recover.controller';
import { ResetPasswordController } from './reset-password.controller';

@Module({
	controllers: [
		CreateAccountController,
		AuthenticateWithPasswordController,
		GetProfileController,
		RequestPasswordRecoverController,
		ResetPasswordController,
		AuthenticateWithGithubController,
	],
	providers: [
		CreateAccountUseCase,
		AuthenticateWithPasswordUseCase,
		GetProfileUseCase,
		RequestPasswordRecoverUseCase,
		ResetPasswordUseCase,
		AuthenticateWithGithubUseCase,
	],
})
export class UserModule {}
