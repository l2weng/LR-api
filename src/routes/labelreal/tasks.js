import Task from '../../data/models/Task'
import User from '../../data/models/User'
import {
  resBuild,
  resErrorBuild,
  resUpdate,
} from '../../data/dataUtils'
import express from 'express'
import path from 'path'
import _ from 'underscore'

const router = express.Router()

router.post('/create', (req, res) => {
  const {userId, fileDirectory, machineId} = req.body
  const name = path.basename(fileDirectory, '.lbr')
  let projectObj = {name, ...req.body}
  Project.create(projectObj).then(project => {
    //创建方式, createType:0 means has userId, createType:1 means only has machineId
    if (!_.isEmpty(userId)) {
      return User.findById(userId).then(user => {
        user.addProjects(project, {through: {isOwner: true}})
        res.json(resBuild(project))
      })
    } else {
      return User.findOne({
        where: {machineId},
      }).then(user => {
        if (!_.isEmpty(user)) {
          return User.findById(user.userId).then(user => {
            user.addProjects(project, {through: {isOwner: true}})
            res.json(resBuild(project))
          })
        } else {
          let userObj = {
            userTypeDesc: userTypeDesc[userType.temporary],
            userType: userType.temporary,
            statusDesc: statusDesc[status.temp],
            avatarColor: generateColor(),
            machineId,
            name: machineId,
          }
          return User.create(userObj).then(user => {
            user.addProjects(project, {through: {isOwner: true}})
            res.json(resBuild(user))
          })
        }
      })
    }
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/update', (req, res) => {
  const {projectId} = req.body
  return Project.update({...req.body}, {
    where: {projectId},
  }).then(project => {
    res.json(resUpdate(project))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

/**
 * Add colleague to project
 */
router.post('/addColleague', (req, res) => {
  const {colleagueId, projectId} = req.body
  return Project.findById(projectId).then(project => {
    return User.findById(colleagueId).then(colleague=>{
      project.addUser(colleague)
      res.json(resBuild(project))
    })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
