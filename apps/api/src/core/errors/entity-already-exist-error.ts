import { ErrorHttp } from './use-case-error';

export class EntityAlreadyExistError extends ErrorHttp {
	constructor(resource?: string) {
		super({
			message:
				(resource
					? `${
							resource.charAt(0).toUpperCase() +
							resource.substring(1).toLowerCase()
						}`
					: 'Entity') + ' already exist.',
			statusCode: 409,
		});
	}
}
