import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const RoutingInspectType = new ObjectType({
  name: 'routingInspectStory',
  fields: {
    routingInspectId: { type: IntType },
    name: { type: StringType },
    inspectDate: { type: FloatType },
    active: { type: IntType },
    factory: { type: StringType },
    url: { type: StringType },
    createdAt: { type: FloatType },
    windMachineId: { type: IntType },
  },
});

export default RoutingInspectType;
