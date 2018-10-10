import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const DefectTypeType = new ObjectType({
  name: 'DefectTypeStory',
  fields: {
    defectTypeId: { type: IntType },
    name: { type: StringType },
    level: { type: StringType },
    suggestion: { type: StringType },
    createdAt: { type: FloatType },
    active: { type: IntType },
    companyId: { type: IntType },
  },
});

export default DefectTypeType;
