import { ErrorHttp } from './use-case-error';

export class NotMemberThisOrganization extends ErrorHttp {
	constructor() {
		super({
			message: `You're not a member of this organization.`,
			statusCode: 401,
		});
	}
}
