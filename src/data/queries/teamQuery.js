import TeamType from '../types/TeamType'
import Team from '../models/Team'
import { criteriaBuild } from '../dataUtils'
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql'

const teamQueryById = {
  name: 'TeamQueryById',
  description: 'Finding Team by ID',
  type: TeamType,
  resolve (_, {id}) {
    return Team.findById(id).then(team => team)
  },
  args: {
    id: {type: GraphQLString},
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

export { teamQueryById, teamQueryAll, teamQueryWhere }
