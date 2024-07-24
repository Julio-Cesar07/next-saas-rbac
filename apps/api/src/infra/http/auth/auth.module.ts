import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EnvService } from '@/infra/env/env.service';

import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			inject: [EnvService],
			global: true,
			useFactory(env: EnvService) {
				const privateKey = env.get('JWT_PRIVATE_KEY');
				const publicKey = env.get('JWT_PUBLIC_KEY');

				return {
					signOptions: { algorithm: 'RS256' },
					privateKey: Buffer.from(privateKey, 'base64'),
					publicKey: Buffer.from(publicKey, 'base64'),
				};
			},
		}),
	],
	providers: [JwtStrategy],
})
export class AuthModule {}
