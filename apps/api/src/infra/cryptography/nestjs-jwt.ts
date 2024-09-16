import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
	JwtEncrypter,
	JwtPayload,
} from '@/domain/saas/application/cryptography/jwt';

@Injectable()
export class NestJsJwt implements JwtEncrypter {
	constructor(private readonly jwtService: JwtService) {}

	signAccessToken(payload: JwtPayload): Promise<string> {
		return this.jwtService.signAsync(payload, {
			expiresIn: '1d',
		});
	}

	signRefreshToken(payload: JwtPayload): Promise<string> {
		return this.jwtService.signAsync(payload, {
			expiresIn: '7d',
		});
	}
}
