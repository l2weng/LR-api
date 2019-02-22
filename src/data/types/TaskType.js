import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const TaskType = new ObjectType({
  name: 'taskStory',
  fields: {
    id: { type: StringType },
    name: { type: StringType },
    type: { type: IntType },
    localTaskId: { type: IntType },
    /**
     * progress 进度最大值100
     */
    progress: { type: IntType },
  },
});

export default TaskType;
