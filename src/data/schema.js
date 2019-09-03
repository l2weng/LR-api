import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import {
  userQueryWhere,
  userQueryContacts,
  usersQueryByTeamId,
  userQueryActiveContacts,
  userQueryById,
  userQueryColleagues,
} from './queries/userQuery';
import { teamQueryWhere, teamQueryByUserId } from './queries/teamQuery';
import { projectQueryByUser, projectQueryById } from './queries/projectQuery';
import { taskQuery, taskQueryById } from './queries/taskQuery';
import { labelQueryByPhoto } from './queries/labelQuery';

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
      userQueryById,
      userQueryColleagues,
      labelQueryByPhoto,
      taskQuery,
      projectQueryById,
      taskQueryById
    },
  }),
});

export default schema;
