import User from '../../data/models/User'
import {
  resErrorBuild,
  resUpdate,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/syncProject', (req, res) => {
  const {syncStatus, syncProjectFile, projectFile, itemCount, localProjectId, name, userId, syncProjectFileName,syncProjectSize} = req.body
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
              syncProjectSize
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
