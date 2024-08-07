import { z } from 'zod'

export const projectModelSchema = z.object({
	__typename: z.literal('Project').default('Project'),
	id: z.string(),
	ownerId: z.string(),
})

export type Project = z.infer<typeof projectModelSchema>
