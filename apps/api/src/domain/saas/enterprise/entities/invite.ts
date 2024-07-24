import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import type { Optional } from '../../../../core/types/optional';
import type { Role } from './types/role';

interface InviteProps {
	email: string;
	createdAt: Date;
	role: Role;
	userId: UniqueEntityId;
	organizationId: UniqueEntityId;
}

export class Invite extends Entity<InviteProps> {
	static create(
		props: Optional<InviteProps, 'createdAt'>,
		id?: UniqueEntityId
	) {
		const invite = new Invite(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id
		);

		return invite;
	}

	get email() {
		return this.props.email;
	}

	set email(email: string) {
		this.props.email = email;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get role() {
		return this.props.role;
	}

	set role(role: Role) {
		this.props.role = role;
	}

	get userId() {
		return this.props.userId;
	}

	get organizationId() {
		return this.props.organizationId;
	}
}
