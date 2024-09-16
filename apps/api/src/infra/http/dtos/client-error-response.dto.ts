import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export class ClientErrorResponse extends createZodDto(
	extendApi(
		z.object({
			message: z.string(),
		})
	)
) {}
