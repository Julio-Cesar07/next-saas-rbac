import {
	createParamDecorator,
	ExecutionContext,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { Request } from 'express';

import { NotMemberThisOrganization } from '@/core/errors/not-member-this-organization-error';
import { MemberRepository } from '@/domain/saas/application/repositories/member-repository';

import { TokenPayloadSchema } from './jwt.strategy';

type ParamDecoratorWithTokenAndParam = {
	param: string;
	token: TokenPayloadSchema;
};

@Injectable()
class GetUserMembershipPipe implements PipeTransform {
	constructor(private memberRepository: MemberRepository) {}

	async transform({ param: slug, token }: ParamDecoratorWithTokenAndParam) {
		CurrentUserAndParam();
		const member = await this.memberRepository.findByUserIdAndSlug(
			token.sub,
			slug
		);

		if (!member) throw new NotMemberThisOrganization();

		return member;
	}
}

const CurrentUserAndParam = createParamDecorator(
	(param: string, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest<Request>();

		const paramValue = request.params[param] ?? '';

		return { param: paramValue, token: request.user as TokenPayloadSchema };
	}
);

export function GetUserMembershipDecorator(param: string = 'slug') {
	return CurrentUserAndParam(param, GetUserMembershipPipe);
}
