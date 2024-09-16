import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z, ZodString } from 'zod';

import { TypeToValidationLib } from '@/core/types/converter-type-to-any-lib';
import { JwtPayload } from '@/domain/saas/application/cryptography/jwt';
import { EnvService } from '@/infra/env/env.service';

const tokenPayloadSchema = z.object<TypeToValidationLib<JwtPayload, ZodString>>(
	{
		sub: z.string().uuid(),
	}
);

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(env: EnvService) {
		const publicKey = env.get('JWT_PUBLIC_KEY');

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: Buffer.from(publicKey, 'base64'),
			algorithms: ['RS256'],
		});
	}

	async validate(payload: TokenPayloadSchema) {
		return tokenPayloadSchema.parse(payload);
	}
}
