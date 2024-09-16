import { Injectable } from '@nestjs/common';

import { TokenRepository } from '@/domain/saas/application/repositories/token-repository';
import { Token } from '@/domain/saas/enterprise/entities/token';

import { PrismaTokenMapper } from '../mappers/prisma-token-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTokenRepository implements TokenRepository {
	constructor(private prisma: PrismaService) {}
	async findById(tokenId: string): Promise<Token | null> {
		const token = await this.prisma.token.findUnique({
			where: {
				id: tokenId,
			},
		});

		return token ? PrismaTokenMapper.toDomain(token) : null;
	}

	async create(token: Token): Promise<void> {
		const data = PrismaTokenMapper.toPrisma(token);
		await this.prisma.token.create({
			data,
		});
	}
}
