import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql'
import UserType from './UserType'

const ProjectType = new ObjectType({
  name: 'projectStory',
  fields: {
    projectId: {type: StringType},
    name: {type: StringType},
    desc: {type: StringType},
    deadline: {type: FloatType},
    projectFile: {type: StringType},
    type: {type: IntType},
    progress: {type: IntType},
    cover: {type: StringType},
    itemCount: {type: IntType},
    syncStatus: {type: BooleanType},
    syncCover: {type: StringType},
    remoteProjectFile: {type: StringType},
    localProjectId: {type: StringType},
    syncProjectFileName: {type: StringType},
    syncProjectFile: {type: StringType},
    syncProjectSize: {type: IntType},
    isOwner: {type: BooleanType},
    user: {type: UserType},
    syncVersion: {type: FloatType},
    createdAt: {type: StringType},
  },
})

export default ProjectType
