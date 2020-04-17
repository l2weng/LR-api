import UserType from '../types/UserType'
import User from '../models/User'
import { criteriaBuild, resErrorBuild, status } from '../dataUtils'

import {
  GraphQLString,
  GraphQLList as List,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'
import Team from '../models/Team'
import UserLogin from '../models/UserLogin'
import sequelize from '../sequelize'
import Message from '../models/Message'

const userQueryById = {
  name: 'UserQueryById',
  description: 'Finding User by ID',
  type: UserType,
  resolve (_, {id}) {
    return User.findOne({
      where: {userId: id},
      include: [
        {
          model: UserLogin,
          as: 'loginRecords',
        }],
    }).then(user => user)
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
 * find active contacts and not exists in my contact list
 */
//todo add contact exist check
const userQueryActiveContacts = {
  name: 'userQueryActiveContacts',
  description: 'find active contacts and not exists in my contact list',
  type: new List(UserType),
  resolve (_, {companyId}) {
    let criteria = {}
    criteria = Object.assign(
      {companyId: companyId ? companyId : {$eq: null}, status: status.active},
      criteria)
    return User.findAll({
      where: criteria,
    }).then(users => { return users})
  },
  args: {
    companyId: {type: GraphQLString},
  },
}

const queryColleaguesAndFriends = {
  name: 'queryColleaguesAndFriends',
  description: 'Finding colleagues and friends',
  type: new List(UserType),
  resolve (_, {userId, companyId}) {
    let getFriends = function (colleagues=[]) {
      return User.findOne({where: {userId}}).then(user => {
        colleagues.push(user)
        return user.getContacts(
          {through: {where: {companyId: ''}}}).
          then(contacts => {
            return colleagues.concat(contacts)
          })
      })
    }
    if(companyId){
      return sequelize.transaction(t => {
        let criteria = {}
        criteria = Object.assign({companyId: companyId, status: status.active},
          criteria)
        return User.findAll({
          where: criteria,
        }, {transaction: t}).then(colleagues => {
          return getFriends(colleagues)
        })
      })
    }else{
      return getFriends()
    }
  },
  args: {
    userId: {type: GraphQLString},
    companyId: {type: GraphQLString},
  },
}

/**
 * User Query Contacts
 * Query 联系人
 */
const userQueryContacts = {
  name: 'userQueryContacts',
  description: 'Finding user contacts',
  type: new List(UserType),
  resolve (_, {userId, companyId}) {
    return User.findOne({where: {userId}}).then(user => {
      return user.getContacts(
        {through: {where: {companyId: companyId ? companyId : ''}}}).
        then(contacts => contacts)
    })
  },
  args: {
    userId: {type: GraphQLString},
    companyId: {type: GraphQLString},
  },
}

/**
 * Query Colleague
 */
const userQueryColleagues = {
  name: 'userQueryColleagues',
  description: 'Finding user colleagues',
  type: new List(UserType),
  resolve (_, {companyId}) {
    return User.findAll({where: {companyId}}).then(users => users)
  },
  args: {
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
    return Team.findById(teamId).then(team => {
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
  userQueryColleagues,
  userQueryWhere,
  userQueryContacts,
  usersQueryByTeamId,
  userQueryActiveContacts,
  queryColleaguesAndFriends,
}
