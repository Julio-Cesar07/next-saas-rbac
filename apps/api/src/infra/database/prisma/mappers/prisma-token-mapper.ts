import type { Prisma, Token } from '@prisma/client';

import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import { Token as RawToken } from '../../../../domain/saas/enterprise/entities/token';

export class PrismaTokenMapper {
	static toPrisma(token: RawToken): Prisma.TokenUncheckedCreateInput {
		return {
			type: token.type,
			userId: token.userId.toString(),
			createdAt: token.createdAt,
			id: token.id.toString(),
		};
	}

	static toDomain(token: Token): RawToken {
		return RawToken.create(
			{
				type: token.type,
				userId: new UniqueEntityId(token.userId),
				createdAt: token.createdAt,
			},
			new UniqueEntityId(token.id)
		);
	}
}
