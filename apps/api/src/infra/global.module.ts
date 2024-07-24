import { Global, Module } from '@nestjs/common';

import { Cryptography } from './cryptography/cryptography.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';

@Global()
@Module({
	imports: [EnvModule, DatabaseModule, Cryptography],
	exports: [EnvModule, DatabaseModule, Cryptography],
})
export class GlobalModule {}
