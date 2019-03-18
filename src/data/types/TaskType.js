import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const TaskType = new ObjectType({
  name: 'taskStory',
  fields: {
    taskId: { type: StringType },
    name: { type: StringType },
    type: { type: IntType },
    localTaskId: { type: IntType },
    /**
     * progress 进度最大值100
     */
    progress: { type: IntType },
    projectId: { type: StringType},
    createdAt: {type: StringType},
  },
});

export default TaskType;
