import { Module } from '@nestjs/common';

import { Hash } from '@/domain/saas/application/cryptography/hash';
import { JwtEncrypter } from '@/domain/saas/application/cryptography/jwt';

import { Bcryptjs } from './bcryptjs';
import { NestJsJwt } from './nestjs-jwt';

@Module({
	providers: [
		{
			provide: Hash,
			useClass: Bcryptjs,
		},
		{
			provide: JwtEncrypter,
			useClass: NestJsJwt,
		},
	],
	exports: [Hash, JwtEncrypter],
})
export class Cryptography {}
