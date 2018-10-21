import {
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const UserTeamsType = new ObjectType({
  name: 'userTeamsStory',
  fields: {
    isOwner: { type: BooleanType },
  },
});

export default UserTeamsType;
