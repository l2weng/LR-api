import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql'
import ProjectType from './ProjectType'
import UserType from './UserType'

const TaskType = new ObjectType({
  name: 'taskStory',
  fields: {
    taskId: {type: StringType},
    name: {type: StringType},
    type: {type: IntType},
    localTaskId: {type: IntType},
    /**
     * progress 进度最大值100
     */
    progress: {type: IntType},
    projectId: {type: StringType},
    createdAt: {type: StringType},
    updatedAt: {type: StringType},
    assignStatus: {type: BooleanType},
    workStatus: {type: IntType},
    active: {type: IntType},
    project: {type: ProjectType},
    isOwner: {type: BooleanType},
    category: {type: IntType},
    creator: {type: UserType},
  },
})

export default TaskType
