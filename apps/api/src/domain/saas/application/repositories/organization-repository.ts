import { Organization } from '../../enterprise/entities/organization';

export abstract class OrganizationRepository {
	abstract create(organization: Organization): Promise<void>;
	abstract findUniqueDomain(domain: string): Promise<Organization | null>;
	abstract findManySlugByHyphenatedOrganizationName(
		organizationName: string
	): Promise<string[]>;
}
