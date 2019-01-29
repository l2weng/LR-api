import UserType from '../types/UserType'
import User from '../models/User'
import { criteriaBuild } from '../dataUtils'
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql'

const userQueryById = {
  name: 'UserQueryById',
  description: 'Finding User by ID',
  type: UserType,
  resolve (_, {id}) {
    return User.findById(id).then(user => user)
  },
  args: {
    id: {type: GraphQLString},
  },
}

const userQueryAll = {
  name: 'UserQueryAll',
  description: 'Finding All users',
  type: new List(UserType),
  resolve () {
    return User.findAll({
      order: [['createdAt', 'ASC']],
    }).then(users => users)
  },
}

const userQueryWhere = {
  name: 'UserQueryWhere',
  description: 'Finding User by Criteria',
  type: new List(UserType),
  resolve (_, {userId, companyId, name, status, userType, email, phone}) {
    let criteria = {}
    criteria = criteriaBuild(
      criteriaBuild(criteria, {userId, companyId, status, userType, phone}),
      {name, email}, 1)
    return User.findAll({
      where: criteria,
    }).then(users => users)
  },
  args: {
    userId: {type: GraphQLString},
    companyId: {type: GraphQLInt},
    name: {type: GraphQLString},
    status: {type: GraphQLInt},
    email: {type: GraphQLString},
    userType: {type: GraphQLInt},
    phone: {type: GraphQLString},
  },
}

export { userQueryById, userQueryAll, userQueryWhere }
