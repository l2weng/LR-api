import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const AuthConfigType = new ObjectType({
  name: 'authConfigStory',
  fields: {
    authConfigId: { type: StringType },
    name: { type: StringType },
    createdBy: { type: StringType },
    modifiedBy: { type: StringType },
    counts: { type: IntType },
  },
});

export default AuthConfigType;
