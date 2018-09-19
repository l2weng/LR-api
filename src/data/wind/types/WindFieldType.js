import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLList,
} from 'graphql';
import WindMachineType from './WindMachineType';

const WindFieldType = new ObjectType({
  name: 'WindFieldType',
  fields: {
    windFieldId: { type: IntType },
    name: { type: StringType },
    serialNumber: { type: StringType },
    province: { type: StringType },
    fieldDefectCache: { type: StringType },
    active: { type: IntType },
    createdAt: { type: FloatType },
    fieldMachines: { type: new GraphQLList(WindMachineType) },
  },
});

export default WindFieldType;
