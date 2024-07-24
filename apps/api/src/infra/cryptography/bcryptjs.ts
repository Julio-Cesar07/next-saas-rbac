import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import type { Hash } from '@/domain/saas/application/cryptography/hash';

@Injectable()
export class Bcryptjs implements Hash {
	async generator(plain: string): Promise<string> {
		return await hash(plain, 6);
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return await compare(plain, hash);
	}
}
