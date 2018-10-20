import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const QuestionClassificationType = new ObjectType({
  name: 'questionClassificationStory',
  fields: {
    questionClassificationId: { type: StringType },
    title: { type: StringType },
    /**
     * type, 0:text, 1: Radio, 2: checkbox
     */
    type: { type: IntType },

    /**
     * options JSON, e.g. {type:'text',options:'is a car'} or {type:'radio',options:['red','blue','green']}
     */
    options: { type: StringType },

    /**
     * 快捷键
     */
    keymap: { type: StringType },
  },
});

export default QuestionClassificationType;
