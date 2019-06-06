import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const ActivityType = new ObjectType({
  name: 'activityStory',
  fields: {
    activityId: { type: StringType },
    type: { type: IntType },
    createdBy: { type: StringType },
    category: { type: IntType },
    time: { type: FloatType },
  },
});

export default ActivityType;
