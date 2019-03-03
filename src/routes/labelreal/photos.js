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
  resUpdate,
} from '../../data/dataUtils'
import express from 'express'
import path from 'path'
import _ from 'underscore'

const router = express.Router()

router.post('/syncProject', (req, res) => {
  const {syncStatus, syncProjectFile, projectFile, itemCount, localProjectId, name, userId, syncProjectFileName} = req.body
  return User.findById(userId).then(user => {
    return user.getProjects(
      {
        joinTableAttributes: ['isOwner'],
        order: [['createdAt', 'DESC']],
      }).
      then(projects => {
        projects.map(project => {
          if (project.projectFile === projectFile) {
            project.update({
              syncStatus,
              syncProjectFile,
              projectFile,
              itemCount,
              localProjectId,
              name,
              syncProjectFileName,
            }).then(project => {
              res.json(resUpdate(project))
            })
          }
        })
      })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})


export default router
