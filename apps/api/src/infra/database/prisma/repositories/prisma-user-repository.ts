import { Injectable } from '@nestjs/common';

import { Member } from '@/domain/saas/enterprise/entities/member';

import type { UserRepository } from '../../../../domain/saas/application/repositories/user-repository';
import type { User } from '../../../../domain/saas/enterprise/entities/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
	constructor(private prisma: PrismaService) {}

	async create(user: User, member: Member): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user, member);
		await this.prisma.user.create({
			data,
		});
	}

	async findUniqueEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user ? PrismaUserMapper.toDomain(user) : null;
	}
}
