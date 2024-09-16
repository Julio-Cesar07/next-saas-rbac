import { Member } from '../../enterprise/entities/member';

export abstract class MemberRepository {
	abstract findByUserIdAndSlug(
		userId: string,
		slug: string
	): Promise<Member | null>;
}
