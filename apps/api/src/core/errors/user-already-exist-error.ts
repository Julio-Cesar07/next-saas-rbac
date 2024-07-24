import { ErrorHttp } from './use-case-error';

export class UserAlreadyExistError extends ErrorHttp {
	constructor() {
		super({
			message: 'User already exist.',
			statusCode: 409,
		});
	}
}
