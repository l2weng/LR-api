import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
} from 'graphql'

const SlothFridgeType = new ObjectType({
  name: 'slothFridgeStory',
  fields: {
    slothKongId: {type: IntType},
    row: {type: IntType},
    col: {type: IntType},
    type: {type: IntType},
  },
})

export default SlothFridgeType
