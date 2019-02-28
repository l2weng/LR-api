import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const PhotoType = new ObjectType({
  name: 'photoStory',
  fields: {
    photoId: { type: StringType },
    fileUrl: { type: StringType },
    status: { type: IntType },
    syncStatus: {type: BooleanType},
    syncFileUrl: {type: StringType},
    syncFileName: {type: StringType},
    size: {type: IntType},
    width: {type: IntType},
    height: {type: IntType},
    mimeType: {type: StringType},
    createdBy: { type: StringType },
    orientation: {type: IntType},
  },
});

export default PhotoType;
