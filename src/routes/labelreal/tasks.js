import Task from '../../data/models/Task'
import User from '../../data/models/User'
import {
  resBuild,
  resErrorBuild,
  resUpdate,
} from '../../data/dataUtils'
import express from 'express'
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

import Project from '../../data/models/Project'

const router = express.Router()

router.post('/create', (req, res) => {
  Task.create(req.body).then(task => {
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

/**
 * Add workers to task and project
 */
router.post('/addWorker', (req, res) => {
  const {workerIds, taskId, projectId} = req.body
  return Task.findById(taskId).then(task => {
    return User.findAll({where: {userId: {[Op.in]:JSON.parse("[" + workerIds + "]")}}}).then(workers => {
      task.addUsers(workers, {through: {projectId}}).then(() => {
        return Project.findById(projectId).then(project => {
          project.addUsers(workers)
        })
      })
      res.json(resBuild(task))
    })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
