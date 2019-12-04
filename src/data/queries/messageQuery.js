import Sequelize from 'sequelize'
import MessageType from '../types/MessageType'
import Message from '../models/Message'
import { GraphQLString, GraphQLList as List } from 'graphql'
const Op = Sequelize.Op;

const messageQuery = {
  name: 'MessageQuery',
  description: 'Finding Message by Criteria',
  type: new List(MessageType),
  resolve (_, {userId}) {
    return Message.findAll({
      where: {
        [Op.or]: [
          {
            userId: userId
          },
          {
            createdBy: userId
          }
        ]
      },
      order: [['createdAt', 'DESC']],
    }).then(messages => messages)
  },
  args: {
    userId: {type: GraphQLString},
  },
}

export { messageQuery }
