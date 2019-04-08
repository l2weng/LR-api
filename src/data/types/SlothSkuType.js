import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql'

const SlothSkuType = new ObjectType({
  name: 'slothSkuStory',
  fields: {
    slothSkuId: {type: IntType},
    skuId: {type: IntType},
    col: {type: IntType},
    row: {type: IntType},
    count: {type: IntType},
    url: {type: StringType},
  },
})

export default SlothSkuType
