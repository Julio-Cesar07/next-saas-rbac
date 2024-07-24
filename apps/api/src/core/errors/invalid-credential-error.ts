import { ErrorHttp } from './use-case-error';

export class InvalidCredentialError extends ErrorHttp {
	constructor() {
		super({
			message: 'Invalid credential.',
			statusCode: 401,
		});
	}
}
