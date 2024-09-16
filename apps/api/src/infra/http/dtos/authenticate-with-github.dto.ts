import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation-pipes';

const authenticateWithGithubDto = z.object({
	code: z.string(),
});

export class AuthenticateWithGithubDto extends createZodDto(
	extendApi(authenticateWithGithubDto)
) {}

export const authenticateWithGithubValidation = new ZodValidationPipe(
	authenticateWithGithubDto
);

export class AuthenticateWithGithubResponse extends createZodDto(
	z.object({
		token: z.string(),
	})
) {}
