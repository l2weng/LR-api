import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const LabelQuestionType = new ObjectType({
  name: 'labelQuestionStory',
  fields: {
    labelQuestionId: { type: StringType },
    cacheQuestions: { type: StringType },
    /**
     * 参考word 或者 pdf url
     */
    Instructions: { type: StringType },
  },
});

export default LabelQuestionType;
