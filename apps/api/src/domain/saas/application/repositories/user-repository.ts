import { Member } from '../../enterprise/entities/member';
import type { User } from '../../enterprise/entities/user';

export abstract class UserRepository {
	abstract create(user: User, member?: Member): Promise<void>;
	abstract save(user: User): Promise<void>;
	abstract findById(userId: string): Promise<User | null>;
	abstract findUniqueEmail(email: string): Promise<User | null>;
}
