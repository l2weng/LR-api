import Photo from '../../data/models/Photo'
import Task from '../../data/models/Task'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/syncPhoto', (req, res) => {
  const {taskId, photoId} = req.body
  return Task.findById(taskId).then(task => {
    return Photo.findById(photoId).then(photo => {
      if (photo) {
        return photo.update({...req.body}).then(photo => {
          task.addPhoto(photo)
          res.json(resBuild(photo))
        })
      }
      else {
        return Photo.create({...req.body}).then(photo => {
          task.addPhoto(photo)
          res.json(resBuild(photo))
        })
      }
    })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
