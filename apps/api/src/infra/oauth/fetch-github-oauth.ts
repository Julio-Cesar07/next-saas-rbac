import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import {
	GithubOAuth,
	UserDataGithub,
} from '@/domain/saas/application/oauth/github-oauth';

import { EnvService } from '../env/env.service';

@Injectable()
export class FetchGithubOAuth implements GithubOAuth {
	constructor(private env: EnvService) {}

	async getUserData(code: string): Promise<UserDataGithub> {
		const githubOAuthUrl = new URL(
			'https://github.com/login/oauth/access_token'
		);

		githubOAuthUrl.searchParams.set(
			'client_id',
			this.env.get('GITHUB_OAUTH_CLIENT_ID')
		);
		githubOAuthUrl.searchParams.set(
			'client_secret',
			this.env.get('GITHUB_OAUTH_CLIENT_SECRET')
		);
		githubOAuthUrl.searchParams.set(
			'redirect_uri',
			this.env.get('GITHUB_OAUTH_CLIENT_REDIRECT_URL')
		);
		githubOAuthUrl.searchParams.set('code', code);

		const githubAccessTokenResponse = await fetch(githubOAuthUrl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
		});

		const githubAccessTokenData = await githubAccessTokenResponse.json();

		const { access_token: accessToken } = z
			.object({
				access_token: z.string(),
				scope: z.string(),
				token_type: z.literal('bearer'),
			})
			.parse(githubAccessTokenData);

		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const githubUserData = await githubUserResponse.json();

		let {
			email,
			id: githubId,
			name,
			avatar_url: avatarUrl,
		} = z
			.object({
				id: z.number().int().transform(String),
				avatar_url: z.string().url(),
				name: z.string().nullable(),
				email: z.string().nullable(),
			})
			.parse(githubUserData);

		if (!email) {
			const emailInfoResponse = await fetch(
				'https://api.github.com/user/emails',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const emailInfoData = await emailInfoResponse.json();

			const emailsPrivates = z
				.object({
					email: z.string().nullable(),
					primary: z.boolean(),
					verified: z.boolean(),
				})
				.array()
				.parse(emailInfoData);

			const emailPrimary = emailsPrivates.find(
				(email) => email.primary && email.verified
			);
			email = emailPrimary ? emailPrimary.email : null;
		}

		return {
			githubId,
			avatarUrl,
			email,
			name,
		};
	}
}
