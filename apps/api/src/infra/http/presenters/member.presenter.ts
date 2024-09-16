import { ApiProperty } from '@nestjs/swagger';

import { Member } from '@/domain/saas/enterprise/entities/member';
import { Role, role } from '@/domain/saas/enterprise/entities/types/role';

export class MemberPresenter {
	@ApiProperty()
	id: string;

	@ApiProperty()
	organizationId: string;

	@ApiProperty()
	userId: string;

	@ApiProperty({
		enum: role,
	})
	role: Role;

	static toHttp(member: Member): MemberPresenter {
		return {
			id: member.id.toString(),
			organizationId: member.organizationId.toString(),
			userId: member.userId.toString(),
			role: member.role,
		};
	}
}

export class MemberPresenterResponse {
	@ApiProperty()
	member: MemberPresenter;
}
