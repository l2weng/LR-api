import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const MembershipType = new ObjectType({
  name: 'membershipStory',
  fields: {
    id: { type: StringType },
    type: { type: StringType },
    /**
     * 会员权益项目参与人数
     */
    accounts: { type: IntType },
    /**
     * 会员权益项目数
     */
    projectCounts: { type: IntType },

    /**
     * 权益过期时间
     */
    dueDate: { type: StringType },
  },
});

export default MembershipType;
