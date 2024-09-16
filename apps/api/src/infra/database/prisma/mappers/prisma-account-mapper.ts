import type { Account, Prisma } from '@prisma/client';

import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import { Account as RawAccount } from '../../../../domain/saas/enterprise/entities/account';

export class PrismaAccountMapper {
	static toPrisma(account: RawAccount): Prisma.AccountCreateInput {
		return {
			provider: account.provider,
			providerAccountId: account.providerAccountId.toString(),
			id: account.id.toString(),
			user: {
				connect: {
					id: account.userId.toString(),
				},
			},
		};
	}

	static toDomain(account: Account): RawAccount {
		return RawAccount.create(
			{
				provider: account.provider,
				providerAccountId: new UniqueEntityId(account.providerAccountId),
				userId: new UniqueEntityId(account.userId),
			},
			new UniqueEntityId(account.id)
		);
	}
}
