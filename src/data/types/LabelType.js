import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const LabelType = new ObjectType({
  name: 'labelStory',
  fields: {
    labelId: { type: FloatType },
    x: { type: IntType },
    y: { type: IntType },
    /**
     * label type, 0: 矩形框, 1:......
     */
    type: { type: IntType },
    status: { type: IntType}

  },
});

export default LabelType;
