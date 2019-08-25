import ProjectType from '../types/ProjectType'
import Project from '../models/Project'
import User from '../models/User'
import { criteriaBuild, photoStatus } from '../dataUtils'
import { GraphQLList as List, GraphQLString } from 'graphql'
import __ from 'underscore'
import UserLogin from '../models/UserLogin'
import Model from '../sequelize'

const projectQueryById = {
  name: 'ProjectQueryById',
  description: 'Finding Project by ID',
  type: ProjectType,
  resolve (_, {projectId}) {
    return Project.findById(projectId).then(project => project)
  },
  args: {
    projectId: {type: GraphQLString},
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
    let calculateProgress = function (result) {
      let progress
      let _pStatus = { total: 0, progress: 100, open: 0, skipped: 0, submitted: 0 }
      if (result.length > 0) {
        for (const p of result) {
          if (p.photoStatus === photoStatus.open) {
            _pStatus.open = p.count
            _pStatus.total += p.count
          }
          if (p.photoStatus === photoStatus.skipped) {
            _pStatus.skipped = p.count
            _pStatus.total += p.count
          }
          if (p.photoStatus === photoStatus.submitted) {
            _pStatus.submitted = p.count
            _pStatus.total += p.count
          }
        }
      }
      progress = _pStatus.total === 0 ? 0 : (((_pStatus.total - _pStatus.open) / _pStatus.total) * 100).toFixed(0)
      return progress
    }
    let getRelatedProjects = async function (user) {
      return user.getProjects(
        {
          joinTableAttributes: ['isOwner'],
          order: [['createdAt', 'DESC']],
        }).
        then(async projects => {
          return Promise.all(projects.map(async project => {
            project.isOwner = project.UserProjects.isOwner
            project.user = user;
            await Model.query(
              `select count(tp.photoId) as count, tp.photoStatus from taskphotos tp where projectId = '${project.projectId}' group by photoStatus`,
              {
                type: Model.QueryTypes.SELECT,
              },
            ).then(result=>{
              project.progress = calculateProgress(result)
            })
            return project
          }))
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
