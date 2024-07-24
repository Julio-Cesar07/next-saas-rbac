import type { Prisma, User } from '@prisma/client';

import { Member } from '@/domain/saas/enterprise/entities/member';

import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import { User as RawUser } from '../../../../domain/saas/enterprise/entities/user';

export class PrismaUserMapper {
	static toPrisma(
		user: RawUser,
		member?: Member
	): Prisma.UserUncheckedCreateInput {
		return {
			email: user.email,
			id: user.id.toString(),
			passwordHash: user.passwordHash,
			name: user.name,
			avatarUrl: user.avatarUrl,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			member_on: member
				? {
						create: {
							id: member.id.toString(),
							organizationId: member.organizationId.toString(),
						},
					}
				: undefined,
		};
	}

	static toDomain(user: User): RawUser {
		return RawUser.create(
			{
				email: user.email,
				name: user.name,
				passwordHash: user.passwordHash,
				avatarUrl: user.avatarUrl,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
			new UniqueEntityId(user.id)
		);
	}
}
