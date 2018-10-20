import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const MessageType = new ObjectType({
  name: 'messageStory',
  fields: {
    messageId: { type: IntType },
    title: { type: StringType },
    content: { type: StringType },
  },
});

export default MessageType;
