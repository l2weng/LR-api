import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql'

const MessageType = new ObjectType({
  name: 'messageStory',
  fields: {
    messageId: {type: IntType},
    title: {type: StringType},
    content: {type: StringType},
    type: {type: IntType},
    status: {type: IntType},
    result: {type: IntType},
    createdBy: {type: StringType},
    createdByName: {type: StringType},
    invited: {type: StringType},
    remarks: {type: StringType},
    createdAt: {type: StringType},
    userId: {type: StringType},
  },
})

export default MessageType
