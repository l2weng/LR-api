import FanPhotoType from '../types/FanPhotoType';
import Task from '../models/FanPhoto';
import { GraphQLList as List, GraphQLInt, GraphQLString } from 'graphql';

const windPhotoQueryWhere = {
  name: 'windFanPhotoQuery',
  description: 'Finding photos by Criteria',
  type: new List(FanPhotoType),
  resolve(_, { windVaneId, type, routingInspectId, sortWay = 'DESC', isBig }) {
    let criteria = {};
    if (windVaneId !== undefined && windVaneId !== '') {
      criteria = { ...criteria, windVaneId };
    }
    if (routingInspectId !== undefined && routingInspectId !== 0) {
      criteria = { ...criteria, routingInspectId };
    }
    if (type !== undefined && type !== '') {
      criteria = { ...criteria, type };
    }
    if (isBig !== undefined && isBig !== '') {
      criteria = { ...criteria, isBig };
    } else {
      criteria = {
        ...criteria,
        isBig: {
          $eq: null,
        },
      };
    }
    criteria = { ...criteria, active: 0 };

    return Task.findAll({
      where: criteria,
      order: [isBig === 1 ? ['createdAt', 'DESC'] : ['sort', sortWay]],
    }).then(windFanPhotos => windFanPhotos);
  },
  args: {
    windVaneId: { type: GraphQLInt },
    type: { type: GraphQLInt },
    routingInspectId: { type: GraphQLInt },
    sortWay: { type: GraphQLString },
    isBig: { type: GraphQLInt },
  },
};

export { windPhotoQueryWhere };
