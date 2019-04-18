import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const SkuType = new ObjectType({
  name: 'skuStory',
  fields: {
    skuId: { type: IntType },
    name: { type: StringType },
    color: { type: StringType },
    bizId: { type: StringType },
  },
});

export default SkuType;
