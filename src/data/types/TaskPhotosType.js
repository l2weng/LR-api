import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
} from 'graphql';

const TaskPhotosType = new ObjectType({
  name: 'taskPhotosStory',
  fields: {
    syncStatus: { type: IntType },
  },
});

export default TaskPhotosType;
