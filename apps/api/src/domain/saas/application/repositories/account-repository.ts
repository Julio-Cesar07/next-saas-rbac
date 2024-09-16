import { Account, AccountProvider } from '../../enterprise/entities/account';

export abstract class AccountRepository {
	abstract create(account: Account): Promise<void>;
	abstract findByUserId(
		userId: string,
		provider: AccountProvider
	): Promise<Account | null>;
}
