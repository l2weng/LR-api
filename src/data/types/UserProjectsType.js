import {
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const UserProjectsType = new ObjectType({
  name: 'userProjectsStory',
  fields: {
    isOwner: { type: BooleanType },
  },
});

export default UserProjectsType;
