import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLList,
} from 'graphql';
import { DataTypes } from 'sequelize';

const FanPhotoType = new ObjectType({
  name: 'FanPhotoType',
  fields: {
    fanPhotoId: { type: StringType },
    name: { type: StringType },
    type: { type: StringType },
    url: { type: StringType },
    thumbUrl: { type: StringType },
    midUrl: { type: StringType },
    active: { type: IntType },
    orientation: { type: IntType },
    sort: { type: IntType },
    isBig: { type: IntType },
    isMask: { type: IntType },
    createdAt: { type: FloatType },
    originMaskUrl: { type: StringType },
    stitchingMaskUrl: { type: StringType },
    needReport: { type: IntType },
    postFlightCVStatus: { type: StringType },
  },
});

export default FanPhotoType;
