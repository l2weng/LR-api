import Project from '../../data/models/Project'
import User from '../../data/models/User'
import {
  generateColor,
  resBuild,
  resErrorBuild,
  statusDesc,
  userTypeDesc,
  userType,
  status,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/create', (req, res) => {
  const {createType, userId} = req.body
  let projectObj = {}

  Project.create(projectObj).then(project => {
    //创建方式, createType:0 means has userId, createType:1 means only has machineId
    if (createType === 0) {
      User.findByPk(userId).then(user => {
        user.addProject(project, {through: {isOwner: true}})
        res.json(resBuild(project))
      })
    } else {
      let userObj = {
        userTypeDesc: userTypeDesc[userType.temporary],
        userType: userType.temporary,
        statusDesc: statusDesc[status.temp],
        avatarColor: generateColor(),
      }
      User.create(userObj).then(user => {
        user.addProject(project, {through: {isOwner: true}})
        res.json(resBuild(project))
      })
    }
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
