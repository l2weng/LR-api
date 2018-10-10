import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const CompanyType = new ObjectType({
  name: 'companyStory',
  fields: {
    companyId: { type: IntType },
    name: { type: StringType },
    type: { type: StringType },
    active: { type: IntType },
    createdAt: { type: FloatType },
    icon: { type: StringType },
  },
});

export default CompanyType;
