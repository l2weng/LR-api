import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import {userQueryWhere} from './queries/userQuery'
import {teamQueryWhere} from './queries/teamQuery'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {userQueryWhere,teamQueryWhere},
  }),
});

export default schema;
