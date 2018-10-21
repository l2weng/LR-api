import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const InvitationType = new ObjectType({
  name: 'invitationStory',
  fields: {
    invitationId: { type: StringType },
    type: { type: IntType },
    /**
     * 邮箱用加密链接显示相应项目
     */
    projectSecretUrl: { type: StringType },
    /**
     * 加密口令
     */
    commandNumber: { type: StringType },
    /**
     * 邀请信状态 0:未查看,1:已查看, 2: 已加入, 2: 过期 (todo 当项目开始的时候, 邀请自动过期)
     */
    status: { type: IntType },
  },
});

export default InvitationType;
