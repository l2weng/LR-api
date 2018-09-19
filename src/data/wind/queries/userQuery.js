import UserType from '../types/UserType';
import User from '../models/User';
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql';
import Sequelize from 'sequelize';

const userQuery = {
  name: 'UserQuery',
  description: 'Finding User by ID',
  type: UserType,
  resolve(_, { id }) {
    return User.findById(id).then(user => user);
  },
  args: {
    id: { type: GraphQLString },
  },
};

const userQueryAll = {
  name: 'UserQueryAll',
  description: 'Finding All users',
  type: new List(UserType),
  resolve() {
    return User.findAll({
      order: [['createdAt', 'ASC']],
    }).then(users => users);
  },
};

const Op = Sequelize.Op;
const userQueryWhere = {
  name: 'UserQueryWhere',
  description: 'Finding User by Criteria',
  type: new List(UserType),
  resolve(_, { userId, companyId, name, active, type, email, phone }) {
    let criteria = {};
    if (userId !== undefined && userId !== '') {
      criteria = {
        ...criteria,
        [Op.or]: [
          { userId: userId },
          { ReaUserUserId: userId }
        ]
      };
    }
    if (companyId !== undefined && companyId !== '') {
      criteria = { ...criteria, companyId };
    }
    if (name !== undefined && name !== '') {
      criteria = Object.assign({ name: { [Op.like]: `%${name}%` } }, criteria);
    }
    if (active !== undefined && active !== '') {
      criteria = Object.assign({ active }, criteria);
    }
    if (type !== undefined && type !== '') {
      criteria = Object.assign({ type }, criteria);
    }
    if (phone !== undefined && phone !== '') {
      criteria = Object.assign({ phone }, criteria);
    }
    if (email !== undefined && email !== '') {
      criteria = Object.assign(
        { email: { [Op.like]: `%${email}%` } },
        criteria,
      );
    }
    return User.findAll({
      where: criteria,
    }).then(users => users);
  },
  args: {
    userId: { type: GraphQLString },
    companyId: { type: GraphQLInt },
    name: { type: GraphQLString },
    active: { type: GraphQLInt },
    email: { type: GraphQLString },
    type: { type: GraphQLInt },
    phone: {type: GraphQLString},
  },
};

export { userQuery, userQueryAll, userQueryWhere };
