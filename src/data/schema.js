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
  queryColleaguesAndFriends
} from './queries/userQuery';
import { teamQueryWhere, teamQueryByUserId } from './queries/teamQuery';
import { projectQueryByUser, projectQueryById } from './queries/projectQuery';
import { taskQuery, taskQueryById } from './queries/taskQuery';
import { labelQueryByPhoto } from './queries/labelQuery';
import { messageQuery } from './queries/messageQuery'

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
      queryColleaguesAndFriends,
      labelQueryByPhoto,
      taskQuery,
      projectQueryById,
      taskQueryById,
      messageQuery
    },
  }),
});

export default schema;
