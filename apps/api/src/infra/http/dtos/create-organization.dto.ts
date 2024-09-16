import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation-pipes';

const createOrganizationDto = z.object({
	name: z.string(),
	domain: z.string().optional(),
	shouldAttachUserByDomain: z.boolean(),
	avatarUrl: z.string().optional(),
});

export class CreateOrganizationDto extends createZodDto(
	extendApi(createOrganizationDto)
) {}

export const createOrganizationValidation = new ZodValidationPipe(
	createOrganizationDto
);

export class CreateOrganizationResponse extends createZodDto(
	z.object({
		organizationId: z.string(),
	})
) {}
