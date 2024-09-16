import { createZodDto } from '@anatine/zod-nestjs';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { z, ZodNumber, ZodString } from 'zod';

import { ErrorHttpProps } from '@/core/errors/use-case-error';
import { TypeToValidationLib } from '@/core/types/converter-type-to-any-lib';

class ErrorDTO extends createZodDto(
	z.object<TypeToValidationLib<ErrorHttpProps, ZodString, ZodNumber>>({
		message: z.string(),
		statusCode: z.number(),
	})
) {}

export function ApiErrorDecorator(
	statusCode: number[],
	description?: string[],
	options?: ApiResponseOptions
) {
	const decorators = statusCode.map((code, index) =>
		ApiResponse({
			...options,
			status: code,
			description:
				description && description.length > index
					? description[index]
					: undefined,
			type: ErrorDTO,
		})
	);
	return applyDecorators(...decorators);
}
