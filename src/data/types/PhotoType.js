import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const PhotoType = new ObjectType({
  name: 'photoStory',
  fields: {
    photoId: { type: StringType },
    syncedWithCloud: { type: BooleanType },
    /**
     * 客户配置图片地址
     */
    fileUrl: { type: StringType },
    /**
     * 云地址
     */
    cloudUrl: { type: StringType },
    /**
     * 图片status, 0: 正常, 1: 删除
     */
    status: { type: IntType },

    createdBy: { type: StringType },
  },
});

export default PhotoType;
