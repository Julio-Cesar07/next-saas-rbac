import { Global, Module } from '@nestjs/common';

import { Cryptography } from './cryptography/cryptography.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { OAuthModule } from './oauth/oauth.module';

@Global()
@Module({
	imports: [EnvModule, DatabaseModule, Cryptography, OAuthModule],
	exports: [EnvModule, DatabaseModule, Cryptography, OAuthModule],
})
export class GlobalModule {}
