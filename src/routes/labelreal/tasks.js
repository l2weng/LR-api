import Task from '../../data/models/Task'
import User from '../../data/models/User'
import {
  resBuild,
  resErrorBuild,
  resUpdate,
  taskStatus,
} from '../../data/dataUtils'
import express from 'express'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

import Project from '../../data/models/Project'

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

router.post('/updateUserTaskStatus', (req, res) => {
  const {taskId, userId} = req.body
  return Task.findById(taskId).then(task=>{
    if(task.userId === userId){

    }
  })
  return User.findById(userId).then(user=>{
    return user.getTasks().then(tasks=>{
      console.log(tasks.length)
      tasks.map(task=>{
        if(task.taskId === taskId){
          task.UserTasks.taskStatus = taskStatus.complete
          return task.UserTasks.save()
        }
      })
    })
  })
})

/**
 * Add workers to task and project
 */
router.post('/addWorker', (req, res) => {
  const {workerIds, taskId, projectId} = req.body
  return Task.findById(taskId).then(task => {
    return User.findAll({where: {userId: {[Op.in]: workerIds}}}).
      then(workers => {
        return task.addUsers(workers, {through: {projectId}}).then(() => {
          return Project.findById(projectId).then(project => {
            project.addUsers(workers)
            workers.map(worker => {
              delete worker.dataValues.password_hash
              delete worker.dataValues.machineId
            })
            res.status(200).send({
              result: 'success',
              workers,
            })
          })
        })
      })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
