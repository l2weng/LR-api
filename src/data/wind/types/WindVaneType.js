import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLList,
} from 'graphql';
import FanPhotoType from './FanPhotoType';

const WindVaneType = new ObjectType({
  name: 'WindVaneType',
  fields: {
    windVaneId: { type: IntType },
    name: { type: StringType },
    serialNumber: { type: StringType },
    factory: { type: StringType },
    active: { type: IntType },
    createdAt: { type: FloatType },
    vaneFanPhotos: { type: new GraphQLList(FanPhotoType) },
  },
});

export default WindVaneType;
