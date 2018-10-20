import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const QuestionItemType = new ObjectType({
  name: 'questionItemStory',
  fields: {
    questionItemId: { type: StringType },
    targetTitle: { type: StringType },
    /**
     * target type. e.g. 'Polygon', 'Point', 'Line', 'Rectangle', //todo pixel
     */
    targetType: { type: IntType },
    /**
     * 标注颜色
     */
    targetColor: { type: StringType },

    /**
     * 是不是有标注完选项提示
     */
    hasOptions: { type: BooleanType },
    /**
     * 问题项单选选项题目
     */
    optionTitle: { type: StringType },
    /**
     *  问题项type, 0:text, 1: Radio, 2: checkbox
     */
    optionType: { type: IntType },

    /**
     *问题选项JSON, e.g. {type:'text',options:'is a car'} or {type:'radio',options:['red','blue','green']}
     */
    options: { type: StringType },

    /**
     * 快捷键
     */
    keymap: { type: StringType },
  },
});

export default QuestionItemType;
