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

    phone: { type: StringType },

    userType: { type: IntType },
    userTypeDesc: { type: StringType },
    statusDesc: { type: StringType },
    avatarColor: { type: StringType },
    machineId: { type: StringType },
    prefix: { type: StringType },
  },
});

export default UserType;
