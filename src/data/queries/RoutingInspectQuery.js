import RoutingInspectType from '../types/RoutingInspectType';
import RoutingInspect from '../models/RoutingInspect';
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql';
import Sequelize from 'sequelize';

const routingInspectQuery = {
  name: 'routingInspectQuery',
  description: 'Finding RoutingInspect by ID',
  type: RoutingInspectType,
  resolve(_, { routingInspectId }) {
    return RoutingInspect.findByPk(routingInspectId).then(
      routingInspect => routingInspect,
    );
  },
  args: {
    routingInspectId: { type: GraphQLInt },
  },
};

const routingInspectQueryAll = {
  name: 'routingInspectQueryAll',
  description: 'Finding All companies',
  type: new List(RoutingInspectType),
  resolve() {
    return RoutingInspect.findAll({ order: [['createdAt', 'DESC']] }).then(
      routingInspect => routingInspect,
    );
  },
};

const Op = Sequelize.Op;
const routingInspectQueryWhere = {
  name: 'routingInspectQueryWhere',
  description: 'Finding RoutingInspect by Criteria',
  type: new List(RoutingInspectType),
  resolve(_, { routingInspectId, name, windMachineId, active }) {
    let criteria = {};
    if (routingInspectId !== undefined && routingInspectId !== '') {
      criteria = { ...criteria, routingInspectId };
    }
    if (name !== undefined && name !== '') {
      criteria = { ...criteria, name: { [Op.like]: `%${name}%` } };
    }
    if (windMachineId !== undefined && windMachineId !== '') {
      criteria = { ...criteria, windMachineId };
    }
    if (active !== undefined && active !== '') {
      criteria = { ...criteria, active };
    }
    return RoutingInspect.findAll({
      where: criteria,
      order: [['createdAt', 'DESC']],
    }).then(routingInspect => routingInspect);
  },
  args: {
    routingInspectId: { type: GraphQLInt },
    name: { type: GraphQLString },
    windMachineId: { type: GraphQLInt },
    active: { type: GraphQLInt },
  },
};

export {
  routingInspectQuery,
  routingInspectQueryAll,
  routingInspectQueryWhere,
};
