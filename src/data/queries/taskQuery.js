import TaskType from '../types/TaskType'
import Task from '../models/Task'
import User from '../models/User'
import { criteriaBuild, commonStatus, taskCategory } from '../dataUtils'
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql'
import __ from 'underscore'
import sequelize from '../sequelize'

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

let getMyTasks = function (user) {
  return user.getTasks({
    joinTableAttributes: ['projectId'],
    order: [['createdAt', 'DESC']],
  }).then(tasks => {
    tasks.map(task => {
      task.project = task.getProject
      task.category = taskCategory.my
    })
    return tasks.filter(task => task.active === commonStatus.active)
  })
}

let getAssignedTasks = function (user) {
  return user.getMyTasks({order: [['createdAt', 'DESC']]}).then(tasks => {
    tasks.map(task => {
      task.project = task.getProject
      task.category = taskCategory.assigned
    })
    return tasks.filter(task => task.active === commonStatus.active)
  })
}

let getAllTasks = function (user) {
  return sequelize.transaction(t =>
    user.getMyTasks({order: [['createdAt', 'DESC']]}, {transaction: t}).
      then(tasks => {
        tasks.map(task => {
          task.project = task.getProject
          task.category = taskCategory.my
        })
        return tasks.filter(task => task.active === commonStatus.active)
      }).then(myTasks =>
      user.getTasks({
        joinTableAttributes: ['projectId'],
        order: [['createdAt', 'DESC']],
      }).then(tasks => {
        tasks.map(task => {
          task.project = task.getProject
          task.category = taskCategory.assigned
        })
        tasks.filter(task => task.active === commonStatus.active)
        return myTasks.concat(tasks)
      }),
    ),
  )
}

/**
 * 我参与的task
 */
const taskQuery = {
  name: 'TaskQueryByUser',
  description: 'Finding Task by userId',
  type: new List(TaskType),
  resolve (_, {userId, type}) {
    if (!__.isEmpty(userId)) {
      return User.findById(userId).then(user => {
        console.log('typetype', type)
        // 1: my task, 2: assigned task, 0:all task
        if (type === 1) {
          return getMyTasks(user)
        } else if (type === 2) {
          return getAssignedTasks(user)
        } else {
          return getAllTasks(user)
        }
      })
    }
  },
  args: {
    userId: {type: GraphQLString},
    type: {type: GraphQLInt},
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
      return user.getMyTasks({order: [['createdAt', 'DESC']]}).then(tasks => {
        tasks.map(task => {
          task.project = task.getProject
        })
        return tasks.filter(task => task.active === commonStatus.active)
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
  taskQuery,
}
