import { envSchema } from '@saas/env'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
	server: envSchema.shape,
	client: {},
	shared: {},
	runtimeEnv: {
		PORT: process.env.PORT,
		DATABASE_URL: process.env.DATABASE_URL,
		JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
		JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
		GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
		GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
		GITHUB_OAUTH_CLIENT_REDIRECT_URL:
			process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URL,
		NODE_ENV: process.env.NODE_ENV,
	},
	emptyStringAsUndefined: true,
})
