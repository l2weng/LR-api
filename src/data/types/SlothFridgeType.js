import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
} from 'graphql'

const SlothFridgeType = new ObjectType({
  name: 'slothFridgeStory',
  fields: {
    slothFridgeId: {type: IntType},
    openCount: {type: IntType},
    fridgeId: {type: IntType},
    type: {type: IntType},
  },
})

export default SlothFridgeType
