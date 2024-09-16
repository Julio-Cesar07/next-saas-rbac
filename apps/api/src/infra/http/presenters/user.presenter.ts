import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/domain/saas/enterprise/entities/user';

export class UserPresenter {
	@ApiProperty()
	id: string;

	@ApiProperty({
		nullable: true,
	})
	name?: string;

	@ApiProperty()
	email: string;

	@ApiProperty({
		nullable: true,
	})
	avatarUrl?: string;

	static toHttp(user: User): UserPresenter {
		return {
			id: user.id.toString(),
			email: user.email,
			avatarUrl: user.avatarUrl ?? undefined,
			name: user.name ?? undefined,
		};
	}
}

export class UserPresenterResponse {
	@ApiProperty()
	user: UserPresenter;
}
