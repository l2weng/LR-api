import TeamType from '../types/TeamType'
import Team from '../models/Team'
import User from '../models/User'
import { criteriaBuild } from '../dataUtils'
import { GraphQLString, GraphQLList as List, GraphQLBoolean } from 'graphql'

const teamQueryById = {
  name: 'TeamQueryById',
  description: 'Finding Team by ID',
  type: TeamType,
  resolve (_, {id}) {
    return Team.findByPk(id).then(team => team)
  },
  args: {
    id: {type: GraphQLString},
  },
}

/**
 * 我参与的team
 */
const teamQueryByUserId = {
  name: 'TeamQueryByUserId',
  description: 'Finding Team by UserId',
  type: new List(TeamType),
  resolve (_, {userId, isOwner}) {
    if (userId !== undefined && userId !== '') {
      return User.findByPk(userId).then(user => {
        return user.getTeams({through: {where:{isOwner}}}).then(teams => teams)
      })
    }
  },
  args: {
    userId: {type: GraphQLString},
    isOwner: {type: GraphQLBoolean},
  },
}

const teamQueryAll = {
  name: 'TeamQueryAll',
  description: 'Finding All teams',
  type: new List(TeamType),
  resolve () {
    return Team.findAll({
      order: [['createdAt', 'DESC']],
    }).then(teams => teams)
  },
}

const teamQueryWhere = {
  name: 'TeamQueryWhere',
  description: 'Finding Team by Criteria',
  type: new List(TeamType),
  resolve (_, {teamId, companyId, name}) {
    let criteria = {}
    criteria = criteriaBuild(criteria, {name}, 1)
    return Team.findAll({
      where: criteria,
    }).then(teams => teams)
  },
  args: {
    name: {type: GraphQLString},
  },
}

export { teamQueryById, teamQueryAll, teamQueryWhere, teamQueryByUserId }
