import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const SkuType = new ObjectType({
  name: 'skuStory',
  fields: {
    skuId: { type: IntType },
    shapeType: { type: StringType },
    name: { type: StringType },
    color: { type: StringType },
    bizId: { type: StringType },
    localSkuId: { type: IntType },
  },
});

export default SkuType;
