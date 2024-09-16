import { Controller, Get } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

import { Member } from '@/domain/saas/enterprise/entities/member';

import { Auth } from '../../auth/auth.decorator';
import { GetUserMembershipDecorator } from '../../auth/get-user-membership.decorator';
import {
	MemberPresenter,
	MemberPresenterResponse,
} from '../../presenters/member.presenter';

@Controller('organization')
@Auth()
export class GetUserMembershipController {
	@Get(':slug/membership')
	@ApiParam({
		name: 'slug',
	})
	async handle(
		@GetUserMembershipDecorator() member: Member
	): Promise<MemberPresenterResponse> {
		return {
			member: MemberPresenter.toHttp(member),
		};
	}
}
