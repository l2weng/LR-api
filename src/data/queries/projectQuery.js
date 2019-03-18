import ProjectType from '../types/ProjectType'
import Project from '../models/Project'
import User from '../models/User'
import { criteriaBuild } from '../dataUtils'
import { GraphQLString, GraphQLList as List, GraphQLBoolean } from 'graphql'
import __ from 'underscore'
import UserLogin from '../models/UserLogin'

const projectQueryById = {
  name: 'ProjectQueryById',
  description: 'Finding Project by ID',
  type: ProjectType,
  resolve (_, {id}) {
    return Project.findById(id).then(project => project)
  },
  args: {
    id: {type: GraphQLString},
  },
}

/**
 * 我参与的project
 */
const projectQueryByUser = {
  name: 'ProjectQueryByUser',
  description: 'Finding Project by userId',
  type: new List(ProjectType),
  resolve (_, {userId, machineId}) {
    let getRelatedProjects = function (user) {
      return user.getProjects(
        {
          joinTableAttributes: ['isOwner'],
          order: [['createdAt', 'DESC']],
        }).
        then(projects => {
          projects.map(project => {
            project.isOwner = project.UserProjects.isOwner
            project.user = user;
          })
          return projects
        })
    }
    if (!__.isEmpty(userId)) {
      return User.findOne({
        where: {userId}, include: [
          {
            model: UserLogin,
            as: 'loginRecords',
            limit: 3,
            order: [['createdAt', 'DESC']],
          }
        ],
      }).then(user => {
        return getRelatedProjects(user)
      })
    } else if (!__.isEmpty(machineId)) {
      return User.findOne({where: {machineId}}).then(user => {
        return getRelatedProjects(user)
      })
    }
  },
  args: {
    userId: {type: GraphQLString},
    machineId: {type: GraphQLString},
  },
}

const projectQueryAll = {
  name: 'ProjectQueryAll',
  description: 'Finding All projects',
  type: new List(ProjectType),
  resolve () {
    return Project.findAll({
      order: [['createdAt', 'DESC']],
    }).then(projects => projects)
  },
}

const projectQueryWhere = {
  name: 'ProjectQueryWhere',
  description: 'Finding Project by Criteria',
  type: new List(ProjectType),
  resolve (_, {projectId, companyId, name}) {
    let criteria = {}
    criteria = criteriaBuild(criteria, {name}, 1)
    return Project.findAll({
      where: criteria,
    }).then(projects => projects)
  },
  args: {
    name: {type: GraphQLString},
  },
}

export {
  projectQueryById,
  projectQueryByUser,
}
