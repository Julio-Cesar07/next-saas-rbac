import {
	AbilityBuilder,
	CreateAbility,
	createMongoAbility,
	MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user-model'
import { permissions } from './permissions'
import { billingSubject } from './subjects/billing-subject'
import { inviteSubject } from './subjects/invite-subject'
import { organizationSubject } from './subjects/organization-subject'
import { projectSubject } from './subjects/project-subject'
import { userSubject } from './subjects/user-subjects'

export * from './models/organization-model'
export * from './models/project.model'
export * from './models/user-model'

const appAbilitiesSchema = z.union([
	userSubject,
	projectSubject,
	organizationSubject,
	inviteSubject,
	billingSubject,

	z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
	const builder = new AbilityBuilder(createAppAbility)

	if (typeof permissions[user.role] !== 'function')
		throw new Error(`Permissions for role ${user.role} not found.`)

	permissions[user.role](user, builder)

	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		},
	})

	return ability
}
