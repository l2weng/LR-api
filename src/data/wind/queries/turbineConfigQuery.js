import TurbineConfigType from '../types/TurbineConfigType';
import TurbineConfig from '../models/TurbineConfig';
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql';
import Sequelize from 'sequelize';

const turbineConfigQueryAll = {
  name: 'turbineConfigQueryAll',
  description: 'Finding All turbineConfigs',
  type: new List(TurbineConfigType),
  resolve() {
    return DefectType.findAll({ order: [['createdAt', 'DESC']] }).then(
      turbineConfig => turbineConfig,
    );
  },
};

const Op = Sequelize.Op;
const turbineConfigQueryWhere = {
  name: 'turbineConfigQueryWhere',
  description: 'Finding turbineConfig by Criteria',
  type: new List(TurbineConfigType),
  resolve(_, { turbineConfigId, name,active}) {
    let criteria = {};
    if (turbineConfigId !== undefined && turbineConfigId !== '') {
      criteria = { ...criteria, turbineConfigId };
    }
    if (name !== undefined && name !== '') {
      criteria = { ...criteria, name: { [Op.like]: `%${name}%` } };
    }
    if (active !== undefined && active !== '') {
      criteria = Object.assign({ active }, criteria);
    }
    return TurbineConfig.findAll({
      where: criteria,
    }).then(turbineConfig => turbineConfig);
  },
  args: {
    turbineConfigId: { type: GraphQLInt },
    name: { type: GraphQLString },
    active: {type: GraphQLInt},
  },
};

export {turbineConfigQueryAll, turbineConfigQueryWhere };
