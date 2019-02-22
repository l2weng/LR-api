import Task from '../../data/models/Task'
import Project from '../../data/models/Project'
import User from '../../data/models/User'
import {
  resBuild,
  resErrorBuild,
  resUpdate,
  taskType,
  taskTypeDesc
} from '../../data/dataUtils'
import express from 'express'
import path from 'path'
import _ from 'underscore'

const router = express.Router()

router.post('/create', (req, res) => {
  Task.create(req.body).then(task=>{
    res.json(resBuild(task))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})
//
// router.post('/update', (req, res) => {
//   const {projectId} = req.body
//   return Task.update({...req.body}, {
//     where: {projectId},
//   }).then(project => {
//     res.json(resUpdate(project))
//   }).catch(err => {
//     resErrorBuild(res, 500, err)
//   })
// })

/**
 * Add colleague to project
 */
// router.post('/addColleague', (req, res) => {
//   const {colleagueId, projectId} = req.body
//   return Project.findById(projectId).then(project => {
//     return User.findById(colleagueId).then(colleague => {
//       project.addUser(colleague)
//       res.json(resBuild(project))
//     })
//   }).catch(err => {
//     resErrorBuild(res, 500, err)
//   })
// })

export default router
