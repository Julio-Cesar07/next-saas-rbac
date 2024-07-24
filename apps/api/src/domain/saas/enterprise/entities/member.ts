import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import type { Optional } from '../../../../core/types/optional';
import type { Role } from './types/role';

interface MemberProps {
	role: Role;
	userId: UniqueEntityId;
	organizationId: UniqueEntityId;
}

export class Member extends Entity<MemberProps> {
	static create(props: Optional<MemberProps, 'role'>, id?: UniqueEntityId) {
		const member = new Member(
			{
				...props,
				role: props.role ?? 'MEMBER',
			},
			id
		);

		return member;
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
