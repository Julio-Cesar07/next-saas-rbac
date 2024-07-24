import { ErrorHttp } from './use-case-error';

export class AccountDoesNotHavePassword extends ErrorHttp {
	constructor() {
		super({
			message: 'User does not have a password, use social login.',
			statusCode: 400,
		});
	}
}
