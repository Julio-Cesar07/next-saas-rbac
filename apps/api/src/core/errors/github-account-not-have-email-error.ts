import { ErrorHttp } from './use-case-error';

export class AccountNotHaveEmailExistError extends ErrorHttp {
	constructor(provider?: string) {
		super({
			message: `${
				provider
					? provider.charAt(0).toUpperCase() +
						provider.substring(1).toLowerCase()
					: undefined
			} account must have an email to authenticate.`,
			statusCode: 409,
		});
	}
}
