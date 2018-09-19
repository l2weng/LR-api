import WindMachineType from '../types/WindMachineType';
import WindMachine from '../models/WindMachine';
import { GraphQLList as List, GraphQLInt } from 'graphql';

const windMachineQueryById = {
  name: 'windMachineQueryById',
  description: 'Finding wind machine by ID',
  type: WindMachineType,
  resolve(_, { windMachineId }) {
    return WindMachine.findById(windMachineId).then(windMachine => windMachine);
  },
  args: {
    windMachineId: { type: GraphQLInt },
  },
};

const windMachineQueryAll = {
  name: 'windMachineQueryAll',
  description: 'Finding all wind machine',
  type:new List(WindMachineType),
  resolve(_, {}) {
    return WindMachine.findAll({}).then(windMachine => windMachine);
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

    return WindMachine.findAll({
      where: criteria,
    }).then(windMachines => windMachines);
  },
  args: {
    windFieldId: { type: GraphQLInt },
    windMachineId: { type: GraphQLInt },
  },
};

export { windMachineQueryWhere, windMachineQueryById,windMachineQueryAll };
