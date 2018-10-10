import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const UserType = new ObjectType({
  name: 'UserStory',
  fields: {
    userId: { type: StringType },
    name: { type: StringType },
    displayName: { type: StringType },
    email: { type: StringType },
    phone: { type: StringType },
    type: { type: IntType },
    companyId: { type: IntType },
    typeDes: { type: StringType },
    active: { type: IntType },
    createdAt: { type: FloatType },
  },
});

export default UserType;
