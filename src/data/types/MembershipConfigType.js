import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const MembershipConfigType = new ObjectType({
  name: 'membershipConfigStory',
  fields: {
    membershipConfigId: { type: StringType },
    level: { type: IntType },
    monthPrice: { type: FloatType },
    /**
     * 支付单位
     */
    unit: { type: IntType },
    yearPrice: { type: FloatType },
    createdBy: { type: StringType },
    modifiedBy: { type: StringType },
    active: { type: IntType },
  },
});

export default MembershipConfigType;
