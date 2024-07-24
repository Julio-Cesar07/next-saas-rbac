import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation-pipes';

const authenticateWithPasswordDto = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export class AuthenticateWithPasswordDto extends createZodDto(
	extendApi(authenticateWithPasswordDto)
) {}

export const authenticateWithPasswordValidation = new ZodValidationPipe(
	authenticateWithPasswordDto
);
