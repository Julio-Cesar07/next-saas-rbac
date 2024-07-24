import { Module } from '@nestjs/common';

import { GlobalModule } from './global.module';
import { HttpModule } from './http/http.module';

@Module({
	imports: [GlobalModule, HttpModule],
})
export class AppModule {}
