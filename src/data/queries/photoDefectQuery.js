import PhotoDefectType from '../types/PhotoDefectType';
import UserLogin from '../models/WindPhotoDefect';
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql';

const photoDefectQueryWhere = {
  name: 'photoDefectQueryWhere',
  description: 'Finding photo defect by Criteria',
  type: new List(PhotoDefectType),
  resolve(_, { linkId, fanPhotoId }) {
    let criteria = {};
    if (linkId !== undefined && linkId !== '') {
      criteria = { ...criteria, linkId };
    }
    if (fanPhotoId !== undefined && fanPhotoId !== '') {
      criteria = { ...criteria, fanPhotoId };
    }
    return UserLogin.findAll({
      where: criteria,
    }).then(photoDefect => photoDefect);
  },
  args: {
    linkId: { type: GraphQLInt },
    fanPhotoId: { type: GraphQLString },
  },
};

export { photoDefectQueryWhere };
