import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql'

import {
  userQueryWhere,
  userQueryContacts,
  usersQueryByTeamId,
  userQueryActiveContacts,
  userQueryById,
} from './queries/userQuery'
import { teamQueryWhere, teamQueryByUserId } from './queries/teamQuery'
import { projectQueryByUser } from './queries/projectQuery'
import { taskQueryByUser } from './queries/taskQuery'

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
      projectQueryByUser,
      taskQueryByUser,
      userQueryById
    },
  }),
})

export default schema
