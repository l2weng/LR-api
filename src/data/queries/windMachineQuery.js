import WindMachineType from '../types/WindMachineType';
import Invitation from '../models/WindMachine';
import { GraphQLList as List, GraphQLInt } from 'graphql';

const windMachineQueryById = {
  name: 'windMachineQueryById',
  description: 'Finding wind machine by ID',
  type: WindMachineType,
  resolve(_, { windMachineId }) {
    return Invitation.findById(windMachineId).then(windMachine => windMachine);
  },
  args: {
    windMachineId: { type: GraphQLInt },
  },
};

const windMachineQueryAll = {
  name: 'windMachineQueryAll',
  description: 'Finding all wind machine',
  type: new List(WindMachineType),
  resolve(_, {}) {
    return Invitation.findAll({}).then(windMachine => windMachine);
  },
};

const windMachineQueryWhere = {
  name: 'windMachineQueryWhere',
  description: 'Finding windMachine by Criteria',
  type: new List(WindMachineType),
  resolve(_, { windFieldId, windMachineId }) {
    let criteria = {};

    if (windFieldId !== undefined && windFieldId !== '') {
      criteria = { ...criteria, windFieldId };
    }
    if (windMachineId !== undefined && windMachineId !== '') {
      criteria = { ...criteria, windMachineId };
    }

    return Invitation.findAll({
      where: criteria,
    }).then(windMachines => windMachines);
  },
  args: {
    windFieldId: { type: GraphQLInt },
    windMachineId: { type: GraphQLInt },
  },
};

export { windMachineQueryWhere, windMachineQueryById, windMachineQueryAll };
