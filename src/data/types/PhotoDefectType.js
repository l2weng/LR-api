import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const PhotoDefectType = new ObjectType({
  name: 'photoDefectStory',
  fields: {
    linkId: { type: IntType },
    fanPhotoId: { type: StringType },
    defectTypeId: { type: IntType },
    coordinates: { type: StringType },
    defectPosition: { type: StringType },
    defectSize: { type: StringType },
    suggestion: { type: StringType },
    defectUniqueNo: { type: StringType },
    level: { type: StringType },
    defectType: { type: StringType },
  },
});

export default PhotoDefectType;
