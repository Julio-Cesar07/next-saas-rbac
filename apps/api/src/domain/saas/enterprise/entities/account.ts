import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';

export type AccountProvider = 'GITHUB';

interface AccountProps {
	provider: AccountProvider;
	providerAccountId: UniqueEntityId;
	userId: UniqueEntityId;
}

export class Account extends Entity<AccountProps> {
	static create(props: AccountProps, id?: UniqueEntityId) {
		const account = new Account(
			{
				...props,
			},
			id
		);

		return account;
	}

	get provider() {
		return this.props.provider;
	}

	get providerAccountId() {
		return this.props.providerAccountId;
	}

	get userId() {
		return this.props.userId;
	}
}
