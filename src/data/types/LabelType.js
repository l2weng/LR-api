import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const LabelType = new ObjectType({
  name: 'labelStory',
  fields: {
    labelId: { type: StringType },
    x: { type: IntType },
    y: { type: IntType },
    angle: { type: IntType },
    mirror: { type: BooleanType },
    width: { type: IntType },
    height: { type: IntType },
    type: { type: IntType },
    status: { type: IntType},
    id: { type: IntType},
    photoId: { type: StringType },
    userId: { type: StringType },
  },
});

export default LabelType;
