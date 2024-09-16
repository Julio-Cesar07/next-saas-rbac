import { Module } from '@nestjs/common';

import { GithubOAuth } from '@/domain/saas/application/oauth/github-oauth';

import { FetchGithubOAuth } from './fetch-github-oauth';

@Module({
	providers: [
		{
			provide: GithubOAuth,
			useClass: FetchGithubOAuth,
		},
	],
	exports: [GithubOAuth],
})
export class OAuthModule {}
