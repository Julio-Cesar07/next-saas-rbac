export type UserDataGithub = {
	githubId: string;
	name?: string | null;
	email?: string | null;
	avatarUrl?: string | null;
};

export abstract class GithubOAuth {
	abstract getUserData(code: string): Promise<UserDataGithub>;
}
