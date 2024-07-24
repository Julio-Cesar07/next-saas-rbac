import { z } from 'zod'

import { organizationModelSchema } from '../models/organization-model'

export const organizationSubject = z.tuple([
	z.union([
		z.literal('manage'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('transfer_ownership'),
	]),
	z.union([z.literal('Organization'), organizationModelSchema]),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
