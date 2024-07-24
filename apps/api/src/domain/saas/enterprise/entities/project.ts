import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import type { Optional } from '../../../../core/types/optional';
import type { Slug } from './value-objects/slug';

interface ProjectProps {
	name: string;
	description: string;
	slug: Slug;
	avatarUrl?: string | null;
	createdAt: Date;
	updatedAt: Date;
	ownerId: UniqueEntityId;
	organizationId: UniqueEntityId;
}

export class Project extends Entity<ProjectProps> {
	static create(
		props: Optional<ProjectProps, 'createdAt' | 'updatedAt'>,
		id?: UniqueEntityId
	) {
		const project = new Project(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
			},
			id
		);

		return project;
	}

	get name() {
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;
	}

	get slug() {
		return this.props.slug;
	}

	get description() {
		return this.props.description;
	}

	set description(description: string) {
		this.props.description = description;
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

	get ownerId() {
		return this.props.ownerId;
	}

	get organizationId() {
		return this.props.organizationId;
	}
}
