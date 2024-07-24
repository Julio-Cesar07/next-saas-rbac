import { Module } from '@nestjs/common';

import { AuthenticateWithPasswordUseCase } from '@/domain/saas/application/use-cases/user/authenticate-with-password';
import { CreateAccountUseCase } from '@/domain/saas/application/use-cases/user/create-account';

import { AuthenticateWithPasswordController } from './authenticate-with-password.controller';
import { CreateAccountController } from './create-account.controller';

@Module({
	controllers: [CreateAccountController, AuthenticateWithPasswordController],
	providers: [CreateAccountUseCase, AuthenticateWithPasswordUseCase],
})
export class UserModule {}
