import WindVaneType from '../types/WindVaneType';
import WindVane from '../models/WindVane';
import FanPhoto from '../models/FanPhoto';
import { GraphQLList as List, GraphQLInt } from 'graphql';
import Model from '../sequelize';
import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLList,
} from 'graphql';

const windVaneQueryWhere = {
  name: 'windVaneQueryWhere',
  description: 'Finding windVane by Criteria',
  type: new List(WindVaneType),
  resolve(_, { windMachineId }) {
    let criteria = {};

    if (windMachineId !== undefined && windMachineId !== '') {
      criteria = { ...criteria, windMachineId };
    }

    return WindVane.findAll({
      include: [
        {
          model: FanPhoto,
          as: 'vaneFanPhotos',
        },
      ],
      where: criteria,
      order: [['windVaneId', 'ASC']]
    }).then(windVanes => windVanes);
  },
  args: {
    windMachineId: { type: GraphQLInt },
  },
};

const windVaneQueryCount = {
  name: 'windVaneQueryCount',
  description: 'Finding photo and defect count by Criteria',
  type: new List(
    new ObjectType({
      name: 'windVaneQueryCount',
      fields: {
        type: { type: IntType },
        photoCount: { type: IntType },
        photoDefectCount: { type: IntType },
      },
    }),
  ),
  resolve(_, { windMachineId, windVaneId,routingInspectId }) {
    if (windVaneId) {
      if(routingInspectId){
        return Model.query(
          'select wfp.type, count(wfp.fanPhotoId) as photoCount, count(wfd.fanPhotoId) as photoDefectCount from WindFanPhotos as wfp left join WindVanes as wv on wfp.windVaneId = wv.windVaneId left join WindPhotoDefects as wfd on wfd.fanPhotoId = wfp.fanPhotoId where wfp.type in (1, 2, 3, 4) and wfp.windVaneId = :windVaneId and wfp.routingInspectId =:routingInspectId and wv.windMachineId =:windMachineId  group by wfp.type',
          {
            replacements: {
              windMachineId,
              windVaneId,
              routingInspectId
            },
            type: Model.QueryTypes.SELECT,
          },
        ).then(windVanes => windVanes);
      }else{
        return Model.query(
          'select wfp.type, count(wfp.fanPhotoId) as photoCount, count(wfd.fanPhotoId) as photoDefectCount from WindFanPhotos as wfp left join WindVanes as wv on wfp.windVaneId = wv.windVaneId left join WindPhotoDefects as wfd on wfd.fanPhotoId = wfp.fanPhotoId where wfp.type in (1, 2, 3, 4) and wfp.windVaneId = :windVaneId and wv.windMachineId =:windMachineId  group by wfp.type',
          {
            replacements: {
              windMachineId,
              windVaneId,
            },
            type: Model.QueryTypes.SELECT,
          },
        ).then(windVanes => windVanes);
      }
    }
    return Model.query(
      'select wfp.type, count(wfp.fanPhotoId) as photoCount, count(wfd.fanPhotoId) as photoDefectCount from WindFanPhotos as wfp left join WindVanes as wv on wfp.windVaneId = wv.windVaneId left join WindPhotoDefects as wfd on wfd.fanPhotoId = wfp.fanPhotoId where wfp.type in (1, 2, 3, 4) and wv.windMachineId =:windMachineId  group by wfp.type',
      {
        replacements: {
          windMachineId,
        },
        type: Model.QueryTypes.SELECT,
      },
    ).then(windVanes => windVanes);
  },
  args: {
    windMachineId: { type: GraphQLInt },
    windVaneId: { type: GraphQLInt },
    routingInspectId:{type:GraphQLInt }
  },
};

export { windVaneQueryWhere, windVaneQueryCount };
