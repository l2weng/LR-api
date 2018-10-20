import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const ReplyType = new ObjectType({
  name: 'replyStory',
  fields: {
    replyId: { type: IntType },
    message: { type: StringType },
  },
});

export default ReplyType;
