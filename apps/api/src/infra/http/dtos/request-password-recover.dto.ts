import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation-pipes';

const requestPasswordRecoverDto = z.object({
	email: z.string().email(),
});

export class RequestPasswordRecoverDto extends createZodDto(
	extendApi(requestPasswordRecoverDto)
) {}

export const requestPasswordRecoverValidation = new ZodValidationPipe(
	requestPasswordRecoverDto
);
