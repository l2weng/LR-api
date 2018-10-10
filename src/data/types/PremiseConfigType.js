import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const PremiseConfigType = new ObjectType({
  name: 'PremiseConfigStory',
  fields: {
    premiseConfigId: { type: IntType },
    serverName: { type: StringType },
    serverAddress: { type: StringType },
    version: { type: StringType },
    port: { type: StringType },
    operationSystem: { type: StringType },
    details: { type: StringType },
    active: { type: IntType },
    createdAt: { type: FloatType },
  },
});

export default PremiseConfigType;
