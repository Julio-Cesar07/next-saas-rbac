import { Organization } from '../../enterprise/entities/organization';

export abstract class OrganizationRepository {
	abstract findUniqueDomain(domain: string): Promise<Organization | null>;
}
