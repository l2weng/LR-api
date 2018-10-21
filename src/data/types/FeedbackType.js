import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const FeedbackType = new ObjectType({
  name: 'feedbackStory',
  fields: {
    feedBackId: { type: StringType },
    title: { type: StringType },
    message: { type: StringType },
  },
});

export default FeedbackType;
