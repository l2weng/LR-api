import PremiseConfigType from '../types/PremiseConfigType';
import PremiseConfig from '../models/PremiseConfig';
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql';
import Sequelize from 'sequelize';

const premiseConfigQueryAll = {
  name: 'premiseConfigQueryAll',
  description: 'Finding All premiseConfigs',
  type: new List(PremiseConfigType),
  resolve() {
    return PremiseConfigType.findAll({ order: [['createdAt', 'DESC']] }).then(
      premiseConfig => premiseConfig,
    );
  },
};

const Op = Sequelize.Op;
const premiseConfigQueryWhere = {
  name: 'premiseConfigQueryWhere',
  description: 'Finding premiseConfig by Criteria',
  type: new List(PremiseConfigType),
  resolve(_, { premiseConfigId, serverName, active }) {
    console.log('123123:', _);
    console.log(premiseConfigId, serverName, active);
    let criteria = {};
    if (premiseConfigId !== undefined && premiseConfigId !== '') {
      criteria = { ...criteria, premiseConfigId };
    }
    if (serverName !== undefined && serverName !== '') {
      criteria = { ...criteria, serverName: { [Op.like]: `%${serverName}%` } };
    }
    if (active !== undefined && active !== '') {
      criteria = Object.assign({ active }, criteria);
    }
    return PremiseConfig.findAll({
      where: criteria,
    }).then(premiseConfig => premiseConfig);
  },
  args: {
    premiseConfigId: { type: GraphQLInt },
    serverName: { type: GraphQLString },
    active: { type: GraphQLInt },
  },
};

export { premiseConfigQueryAll, premiseConfigQueryWhere };
