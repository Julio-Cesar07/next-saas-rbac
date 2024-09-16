import z from 'zod'

export const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().url(),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
	GITHUB_OAUTH_CLIENT_ID: z.string(),
	GITHUB_OAUTH_CLIENT_SECRET: z.string(),
	GITHUB_OAUTH_CLIENT_REDIRECT_URL: z.string().url(),
	NODE_ENV: z
		.enum(['local', 'test', 'development', 'production'])
		.optional()
		.default('local'),
})

export type Env = z.infer<typeof envSchema>
