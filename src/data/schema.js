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
import { taskQueryByUser, taskQueryByOwner } from './queries/taskQuery';
import { labelQueryByPhoto } from './queries/labelQuery';
import { slothQueryAll, slothSkuQueryAll } from './queries/slothQuery';

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
      slothQueryAll,
      slothSkuQueryAll,
    },
  }),
});

export default schema;
