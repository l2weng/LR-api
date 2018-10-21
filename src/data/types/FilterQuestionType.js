import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const FilterQuestionType = new ObjectType({
  name: 'filterQuestionStory',
  fields: {
    filterQuestionId: { type: StringType },
    title: { type: StringType },
    /**
     *  问题保存用的key
     */
    key: { type: StringType },
    /**
     *  true answer 保存的客户需要的value形式, e.g. 'Yes' '0'
     */
    trueAnswerVal: { type: StringType },
    /**
     *  false answer 保存的客户需要的value形式, e.g. 'NO' '1'
     */
    falseAnswerVal: { type: StringType },
  },
});

export default FilterQuestionType;
