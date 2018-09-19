import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const WindMachineType = new ObjectType({
  name: 'WindMachineType',
  fields: {
    windMachineId: { type: IntType },
    turbineConfigId: { type: IntType },
    name: { type: StringType },
    factory: { type: StringType },
    turbineConfigName: { type: StringType },
    serialNumber: { type: StringType },
    exportStatus: { type: IntType },
    exportedWordUrl:{ type: StringType },
  },
});

export default WindMachineType;
