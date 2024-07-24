export abstract class Hash {
	abstract generator(plain: string): Promise<string>;
	abstract compare(plain: string, hash: string): Promise<boolean>;
}
