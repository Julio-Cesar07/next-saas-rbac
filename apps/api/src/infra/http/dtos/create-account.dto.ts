import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation-pipes';

const createAccountDto = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

export class CreateAccountDto extends createZodDto(
	extendApi(createAccountDto)
) {}

export const createAccountValidation = new ZodValidationPipe(createAccountDto);
