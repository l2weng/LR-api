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
import { taskQueryByUser, taskQueryByOwner, taskQueryById } from './queries/taskQuery';
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
      taskQueryByUser,
      userQueryById,
      userQueryColleagues,
      labelQueryByPhoto,
      taskQueryByOwner,
      projectQueryById,
      taskQueryById
    },
  }),
});

export default schema;
