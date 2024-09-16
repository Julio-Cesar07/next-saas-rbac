import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ApiController } from './controllers/api.controller';
import { OrganizationModule } from './controllers/organization/organization.module';
import { UserModule } from './controllers/users/user.module';

@Module({
	controllers: [ApiController],
	imports: [AuthModule, UserModule, OrganizationModule],
})
export class HttpModule {}
