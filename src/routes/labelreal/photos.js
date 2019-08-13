import Photo from '../../data/models/Photo'
import Task from '../../data/models/Task'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/syncPhoto', (req, res) => {
  const {photoId, tasks, projectId} = req.body
  try {
    if (photoId) {
      return Photo.findById(photoId).then(photo => {
        if (photo) {
          return photo.update({...req.body}).then(photo => {
            return Task.findAll({where: {taskId: tasks}}).then(_tasks => {
              photo.setTasks(_tasks,
                {through: {projectId, updatedTime: Date.now()}})
              res.json(resBuild(photo))
            })
          })
        }
      })
    } else {
      delete req.body.photoId
      return Photo.create({...req.body}).then(photo => {
        return Task.findAll({where: {taskId: tasks}}).then(_tasks => {
          photo.setTasks(_tasks,
            {through: {projectId, updatedTime: Date.now()}})
          res.json(resBuild(photo))
        })
      })
    }
  } catch (e) {
    resErrorBuild(res, 500, e)
  }
})

export default router
