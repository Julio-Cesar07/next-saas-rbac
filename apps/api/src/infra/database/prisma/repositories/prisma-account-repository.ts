import { Injectable } from '@nestjs/common';

import { AccountRepository } from '@/domain/saas/application/repositories/account-repository';
import {
	Account,
	AccountProvider,
} from '@/domain/saas/enterprise/entities/account';

import { PrismaAccountMapper } from '../mappers/prisma-account-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
	constructor(private prisma: PrismaService) {}

	async create(account: Account): Promise<void> {
		const data = PrismaAccountMapper.toPrisma(account);
		await this.prisma.account.create({
			data,
		});
	}

	async findByUserId(
		userId: string,
		provider: AccountProvider
	): Promise<Account | null> {
		const account = await this.prisma.account.findUnique({
			where: {
				provider_userId: {
					provider,
					userId,
				},
			},
		});

		return account ? PrismaAccountMapper.toDomain(account) : null;
	}
}
