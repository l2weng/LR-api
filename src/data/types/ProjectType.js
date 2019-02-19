import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const ProjectType = new ObjectType({
  name: 'projectStory',
  fields: {
    projectId: { type: StringType },
    name: { type: StringType },
    desc: { type: StringType },
    deadline: { type: FloatType },
    /**
     * project type, 0: true or false question , 1: label, 2: review //todo extend much more type project
     */
    type: { type: IntType },
    /**
     * progress 进度最大值100
     */
    progress: { type: IntType },
    fileDirectory: { type: StringType},
    cover: { type: StringType},
    isOwner: {type:BooleanType}
  },
});

export default ProjectType;
