import Task from '../../data/models/Task'
import User from '../../data/models/User'
import {
  resBuild,
  resErrorBuild,
  resUpdate,
  taskStatus,
  commonStatus,
} from '../../data/dataUtils'
import express from 'express'
import Project from '../../data/models/Project'
import sequelize from '../../data/sequelize'
import __ from 'underscore'

const router = express.Router()

router.post('/create', (req, res) => {
  Task.create({workStatus: taskStatus.open, ...req.body}).then(task => {
    res.json(resBuild(task))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/update', (req, res) => {
  const {taskId} = req.body
  return Task.update({...req.body}, {
    where: {taskId},
  }).then(task => {
    res.json(resUpdate(task))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

let updateActive = function (taskId, res, activeStatus) {
  return sequelize.transaction(t => {
    return Task.update({active: activeStatus}, {
      where: {taskId},
    }, {transaction: t}).then(user => {
      return sequelize.query(
        `UPDATE taskphotos SET active = ${activeStatus} where taskId='${taskId}'`)
    })
  }).then(result => {
    res.status(200).send({result: 'success'})
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
}

/**
 * Load tasks
 */
router.post('/loadTasks', (req, res) => {
  const {taskIds} = req.body
  return Task.findAll({where: {taskId: taskIds}}).then(_tasks => {
    res.json(resBuild(_tasks,0,3))
  })
})

/**
 * 临时删除task
 */
router.post('/remove', (req, res) => {
  const {taskId} = req.body

  return updateActive(taskId, res, commonStatus.removed)
})

/**
 * 恢复临时删除的task
 */
router.post('/revert', (req, res) => {
  const {taskId} = req.body

  return updateActive(taskId, res, commonStatus.active)
})

router.post('/updateUserTaskStatus', (req, res) => {
  const {taskId, userId, workStatus} = req.body
  return User.findById(userId).then(user=>{
    return user.getTasks().then(tasks=>{
      let fTasks = tasks.filter(task=> task.taskId === taskId)
      let updateTaskStatus = function () {
        return Task.update({workStatus}, {
          where: {taskId},
        }).then(task => {
          res.json(resUpdate(task))
        }).catch(err => {
          resErrorBuild(res, 500, err)
        })
      }
//任务未分配过
      if(fTasks.length===0){
        return updateTaskStatus()
      }
      //任务分配过
      else{
        tasks.map(task=>{
          if(task.taskId === taskId){
            task.UserTasks.taskStatus = taskStatus.complete
            return task.UserTasks.save()
          }
        })
        return updateTaskStatus()
      }
    })
  })
})

/**
 * Add workers to task and project
 */
router.post('/addWorker', (req, res) => {
  const {workerIds, taskId, projectId} = req.body
  return Task.findById(taskId).then(task => {
    return task.getUsers().then(oldUsers=>{
      let oldUser = oldUsers[0]
      return User.findAll({where: {userId: workerIds[0]}}).
        then(workers => {
          let worker = workers[0]
          delete worker.dataValues.password_hash
          delete worker.dataValues.machineId
          console.log('---------', workerIds[0],oldUser.userId)
          if(oldUser && (workerIds[0] !== oldUser.userId)){
            task.removeUsers(oldUser)
          }
          return task.addUsers(worker, {through: {projectId}}).then(() => {
            return Project.findById(projectId).then(project => {
              return project.getUsers().then(projectUsers => {
                return oldUser.getTasks({where: {projectId}}).then(oldUserTasks=>{
                  projectUsers.map(pu=>{
                    if (oldUser && pu.userId === oldUser.userId &&
                      !pu.UserProjects.isOwner) {
                      if(oldUserTasks.length===0){
                        project.removeUsers(oldUser)
                      }
                    }
                  })
                  project.addUsers(worker)
                  res.status(200).send({
                    result: 'success',
                    workers,
                  })
                })
              })
            })
          })
        })
    })
  }).catch(err => {
    console.log(err)
    resErrorBuild(res, 500, err)
  })
})

export default router
