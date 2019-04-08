import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
} from 'graphql'

const SlothKongType = new ObjectType({
  name: 'slothKongStory',
  fields: {
    slothKongId: {type: IntType},
    row: {type: IntType},
    col: {type: IntType},
    type: {type: IntType},
  },
})

export default SlothKongType