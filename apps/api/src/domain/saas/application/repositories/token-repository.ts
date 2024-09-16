import { Token } from '../../enterprise/entities/token';

export abstract class TokenRepository {
	abstract create(token: Token): Promise<void>;
	abstract findById(tokenId: string): Promise<Token | null>;
}
