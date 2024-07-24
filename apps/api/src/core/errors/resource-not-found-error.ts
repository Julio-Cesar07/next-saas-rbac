import { ErrorHttp } from './use-case-error';

export class ResourceNotFoundError extends ErrorHttp {
	constructor(resource?: string) {
		super({
			message: resource
				? `${
						resource.charAt(0).toUpperCase() +
						resource.substring(1).toLowerCase()
					} not found.`
				: 'Resource not found.',
			statusCode: 404,
		});
	}
}
