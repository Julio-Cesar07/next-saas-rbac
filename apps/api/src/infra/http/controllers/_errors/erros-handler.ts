import { ArgumentsHost, Catch } from '@nestjs/common';

import { ErrorHttp } from '@/core/errors/use-case-error';

@Catch(ErrorHttp)
export class ErrorHandler {
	catch(exception: ErrorHttp, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		response.status(exception.statusCode).json({
			statusCode: exception.statusCode,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: exception.message,
		});
	}
}
