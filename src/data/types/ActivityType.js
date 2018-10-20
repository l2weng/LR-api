import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
} from 'graphql';

const ActivityType = new ObjectType({
  name: 'activityStory',
  fields: {
    activityId: { type: StringType },
    type: { type: StringType },
    createdBy: { type: StringType },
    dataSetName: { type: StringType },
    time: { type: FloatType },
  },
});

export default ActivityType;
