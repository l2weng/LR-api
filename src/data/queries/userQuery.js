import UserType from '../types/UserType'
import User from '../models/User'
import { criteriaBuild } from '../dataUtils'
import {
  GraphQLString,
  GraphQLList as List,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'
import Team from '../models/Team'

const userQueryById = {
  name: 'UserQueryById',
  description: 'Finding User by ID',
  type: UserType,
  resolve (_, {id}) {
    return User.findByPk(id).then(user => user)
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
      order: [['createdAt', 'DESC']],
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

/**
 * User Query Contacts
 * 我的联系人
 */
const userQueryContacts = {
  name: 'userQueryContacts',
  description: 'Finding user contacts',
  type: new List(UserType),
  resolve (_, {userId, isOwner,companyId}) {
    return User.findOne({where: {userId}}).then(user => {
      return user.getContacts({through: {where: {isOwner,companyId}}}).
        then(contacts => contacts)
    })
  },
  args: {
    userId: {type: GraphQLString},
    isOwner: {type: GraphQLBoolean},
    companyId: {type: GraphQLString},
  },
}

/**
 * Users Query by teamId
 */
const usersQueryByTeamId = {
  name: 'userQueryByTeam',
  description: 'Finding user with teamId',
  type: new List(UserType),
  resolve (_, {teamId, isOwner}) {
    return Team.findByPk(teamId).then(team => {
      return team.getUsers({through: {where: {isOwner}}}).then(users => users)
    })
  },
  args: {
    teamId: {type: GraphQLString},
    isOwner: {type: GraphQLBoolean},
  },
}

export {
  userQueryById,
  userQueryAll,
  userQueryWhere,
  userQueryContacts,
  usersQueryByTeamId,
}
