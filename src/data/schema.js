import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql'

import { userQueryWhere, userQueryContacts, usersQueryByTeamId } from './queries/userQuery'
import { teamQueryWhere, teamQueryByUserId } from './queries/teamQuery'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {userQueryWhere, teamQueryWhere, teamQueryByUserId, userQueryContacts, usersQueryByTeamId},
  }),
})

export default schema
