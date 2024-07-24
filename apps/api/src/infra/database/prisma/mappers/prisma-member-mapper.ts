import type { Member, Prisma } from '@prisma/client';

import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import { Member as RawMember } from '../../../../domain/saas/enterprise/entities/member';

export class PrismaMemberMapper {
	static toPrisma(member: RawMember): Prisma.MemberUncheckedCreateInput {
		return {
			organizationId: member.organizationId.toString(),
			userId: member.userId.toString(),
			role: member.role,
			id: member.id.toString(),
		};
	}

	static toDomain(member: Member): RawMember {
		return RawMember.create(
			{
				organizationId: new UniqueEntityId(member.organizationId),
				userId: new UniqueEntityId(member.userId),
				role: member.role,
			},
			new UniqueEntityId(member.id)
		);
	}
}
