import { Injectable } from '@nestjs/common';

import { MemberRepository } from '@/domain/saas/application/repositories/member-repository';
import { Member } from '@/domain/saas/enterprise/entities/member';

import { PrismaMemberMapper } from '../mappers/prisma-member-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMemberRepository implements MemberRepository {
	constructor(private prisma: PrismaService) {}
	async findByUserIdAndSlug(
		userId: string,
		slug: string
	): Promise<Member | null> {
		const member = await this.prisma.member.findFirst({
			where: {
				organization: {
					slug,
				},
				userId,
			},
		});

		return member ? PrismaMemberMapper.toDomain(member) : null;
	}
}
