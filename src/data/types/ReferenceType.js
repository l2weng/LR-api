import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const ReferenceType = new ObjectType({
  name: 'referenceStory',
  fields: {
    referenceId: { type: StringType },
    syncedWithCloud: { type: BooleanType },
    /**
     * 客户配置图片地址
     */
    fileUrl: { type: StringType },
    /**
     * 文件类型0: images, 1: pdf
     */
    fileType: { type: IntType },
    /**
     * 云地址
     */
    cloudUrl: { type: StringType },
  },
});

export default ReferenceType;
