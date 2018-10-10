import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const TurbineConfigType = new ObjectType({
  name: 'TurbineConfigStory',
  fields: {
    turbineConfigId: { type: IntType },
    name: { type: StringType },
    pixelLength: { type: FloatType },
    vaneLength: { type: FloatType },
    active: { type: IntType },
    createdAt: { type: FloatType },
  },
});

export default TurbineConfigType;
