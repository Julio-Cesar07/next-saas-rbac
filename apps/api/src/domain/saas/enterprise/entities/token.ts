import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import type { Optional } from '../../../../core/types/optional';

type TokenType = 'PASSWORD_RECOVER';

interface TokenProps {
	type: TokenType;
	createdAt: Date;
	userId: UniqueEntityId;
}

export class Token extends Entity<TokenProps> {
	static create(props: Optional<TokenProps, 'createdAt'>, id?: UniqueEntityId) {
		const token = new Token(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id
		);

		return token;
	}

	get type() {
		return this.props.type;
	}

	set type(type: TokenType) {
		this.props.type = type;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get userId() {
		return this.props.userId;
	}
}
