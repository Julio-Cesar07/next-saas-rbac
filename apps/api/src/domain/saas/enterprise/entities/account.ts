import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';

type AccountProvider = 'GITHUB';

interface AccountProps {
	provider: AccountProvider;
	provider_account_id: UniqueEntityId;
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

	get provider_account_id() {
		return this.props.provider_account_id;
	}

	get userId() {
		return this.props.userId;
	}
}
