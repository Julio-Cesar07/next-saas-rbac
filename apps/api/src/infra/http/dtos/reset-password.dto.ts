import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation-pipes';

const resetPasswordDto = z.object({
	code: z.string(),
	password: z.string().min(8),
});

export class ResetPasswordDto extends createZodDto(
	extendApi(resetPasswordDto)
) {}

export const resetPasswordValidation = new ZodValidationPipe(resetPasswordDto);
