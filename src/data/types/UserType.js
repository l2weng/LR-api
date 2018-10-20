import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const UserType = new ObjectType({
  name: 'userStory',
  fields: {
    userId: { type: StringType },
    name: { type: StringType },

    email: { type: StringType },

    status: { type: IntType },

    password_hash: { type: StringType },

    phone: { type: StringType },

    password: { type: StringType },
  },
});

export default UserType;
