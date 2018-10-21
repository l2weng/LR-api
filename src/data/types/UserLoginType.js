import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const UserLoginType = new ObjectType({
  name: 'userLoginStory',
  fields: {
    userLoginId: { type: StringType },
    ip: { type: StringType },
  },
});

export default UserLoginType;
