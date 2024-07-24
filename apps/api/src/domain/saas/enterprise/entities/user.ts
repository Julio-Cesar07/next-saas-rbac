import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import type { Optional } from '../../../../core/types/optional';

interface UserProps {
	name?: string | null;
	email: string;
	passwordHash?: string | null;
	avatarUrl?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export class User extends Entity<UserProps> {
	static create(
		props: Optional<UserProps, 'createdAt' | 'updatedAt'>,
		id?: UniqueEntityId
	) {
		const user = new User(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
			},
			id
		);

		return user;
	}

	get name() {
		return this.props.name;
	}

	set name(name: string | null | undefined) {
		this.props.name = name;
	}

	get email() {
		return this.props.email;
	}

	set email(email: string) {
		this.props.email = email;
	}

	get passwordHash() {
		return this.props.passwordHash;
	}

	set passwordHash(passwordHash: string | null | undefined) {
		this.props.passwordHash = passwordHash;
	}

	get avatarUrl() {
		return this.props.avatarUrl;
	}

	set avatarUrl(avatarUrl: string | null | undefined) {
		this.props.avatarUrl = avatarUrl;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	touch() {
		this.props.updatedAt = new Date();
	}
}
