import { Entity } from '../../../../core/entities/entity';
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import type { Optional } from '../../../../core/types/optional';
import type { Slug } from './value-objects/slug';

interface OrganizationProps {
	name: string;
	slug: Slug;
	domain?: string | null;
	shouldAttachUserByDomain: boolean;
	avatarUrl?: string | null;
	createdAt: Date;
	updatedAt: Date;
	ownerId: UniqueEntityId;
}

export class Organization extends Entity<OrganizationProps> {
	static create(
		props: Optional<
			OrganizationProps,
			'createdAt' | 'updatedAt' | 'shouldAttachUserByDomain'
		>,
		id?: UniqueEntityId
	) {
		const organization = new Organization(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
				shouldAttachUserByDomain: props.shouldAttachUserByDomain ?? false,
			},
			id
		);

		return organization;
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

	get domain() {
		return this.props.domain;
	}

	set domain(domain: string | null | undefined) {
		this.props.domain = domain;
	}

	get shouldAttachUserByDomain() {
		return this.props.shouldAttachUserByDomain;
	}

	set shouldAttachUserByDomain(shouldAttachUserByDomain: boolean) {
		this.props.shouldAttachUserByDomain = shouldAttachUserByDomain;
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
}
