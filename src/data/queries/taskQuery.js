import TaskType from '../types/TaskType'
import Task from '../models/Task'
import User from '../models/User'
import { criteriaBuild, commonStatus} from '../dataUtils'
import { GraphQLString, GraphQLList as List } from 'graphql'
import __ from 'underscore'

const taskQueryById = {
  name: 'TaskQueryById',
  description: 'Finding Task by ID',
  type: TaskType,
  resolve (_, {id}) {
    return Task.findById(id).then(task => task)
  },
  args: {
    id: {type: GraphQLString},
  },
}

/**
 * 我参与的task
 */
const taskQueryByUser = {
  name: 'TaskQueryByUser',
  description: 'Finding Task by userId',
  type: new List(TaskType),
  resolve (_, {userId, machineId}) {
    let getRelatedTasks = function (user) {
      return user.getTasks(
        {
          joinTableAttributes: ['projectId'],
          order: [['createdAt', 'DESC']],
        }).
        then(tasks => {
          tasks.map(task => {
            task.project = task.getProject
          })
          return tasks.filter(task=> task.active === commonStatus.active)
        })
    }
    if (!__.isEmpty(userId)) {
      return User.findById(userId).then(user => {
        return getRelatedTasks(user)
      })
    } else if (!__.isEmpty(machineId)) {
      return User.findOne({where: {machineId}}).then(user => {
        return getRelatedTasks(user)
      })
    }
  },
  args: {
    userId: {type: GraphQLString},
    machineId: {type: GraphQLString},
  },
}
/**
 * 我创建的task
 */
const taskQueryByOwner = {
  name: 'TaskQueryByOwner',
  description: 'Finding Task by owner userId',
  type: new List(TaskType),
  resolve (_, {userId}) {
    let getRelatedTasks = function (user) {
      return user.getMyTasks().then(tasks => {
        tasks.map(task => {
          task.project = task.getProject
        })
        return tasks.filter(task=> task.active === commonStatus.active)
      })
    }
    if (!__.isEmpty(userId)) {
      return User.findById(userId).then(user => {
        return getRelatedTasks(user)
      })
    }
  },
  args: {
    userId: {type: GraphQLString},
  },
}

const taskQueryAll = {
  name: 'TaskQueryAll',
  description: 'Finding All tasks',
  type: new List(TaskType),
  resolve () {
    return Task.findAll({
      order: [['createdAt', 'DESC']],
    }).then(tasks => tasks)
  },
}

const taskQueryWhere = {
  name: 'TaskQueryWhere',
  description: 'Finding Task by Criteria',
  type: new List(TaskType),
  resolve (_, {taskId, companyId, name}) {
    let criteria = {}
    criteria = criteriaBuild(criteria, {name}, 1)
    return Task.findAll({
      where: criteria,
    }).then(tasks => tasks)
  },
  args: {
    name: {type: GraphQLString},
  },
}

export {
  taskQueryById,
  taskQueryByOwner,
  taskQueryByUser,
}
