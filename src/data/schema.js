import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql'

import {
  userQueryWhere,
  userQueryContacts,
  usersQueryByTeamId,
  userQueryActiveContacts,
} from './queries/userQuery'
import { teamQueryWhere, teamQueryByUserId } from './queries/teamQuery'
import { projectQueryByUser } from './queries/projectQuery'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      userQueryWhere,
      teamQueryWhere,
      teamQueryByUserId,
      userQueryContacts,
      usersQueryByTeamId,
      userQueryActiveContacts,
      projectQueryByUser
    },
  }),
})

export default schema
