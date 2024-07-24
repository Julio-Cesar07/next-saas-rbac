export type JwtPayload = {
	sub: string;
};

export abstract class JwtEncrypter {
	abstract signAccessToken(payload: JwtPayload): Promise<string>;
	abstract signRefreshToken(payload: JwtPayload): Promise<string>;
}
