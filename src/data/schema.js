import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import {userQueryWhere} from './queries/userQuery'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {userQueryWhere},
  }),
});

export default schema;
