import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const DateSetType = new ObjectType({
  name: 'dateSetStory',
  fields: {
    dataSetId: { type: StringType },
    name: { type: StringType },
    diskPhotoFolder: { type: StringType },
    diskCsvAddress: { type: StringType },
    from: { type: IntType },
    localUrl: { type: StringType },

    /**
     * 远程文件服务
     */
    remoteUrl: { type: StringType },

    /**
     * 本地共享文件夹
     */
    localFileSystem: { type: StringType },

    /**
     * 远程共享文件夹
     */
    remoteFileSystem: { type: StringType },

    /**
     * Use Cloud false: unused, true: used
     */
    useCloud: { type: BooleanType },

    /**
     * 0: 未同步上云, 1: 已经同步成功, 2: 部分成功, 3: 同步中
     */
    syncStatus: { type: IntType },
  },
});

export default DateSetType;
