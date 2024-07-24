import { Member } from '../../enterprise/entities/member';
import type { User } from '../../enterprise/entities/user';

export abstract class UserRepository {
	abstract create(user: User, member?: Member): Promise<void>;
	abstract findUniqueEmail(email: string): Promise<User | null>;
}
