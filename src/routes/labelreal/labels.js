import Label from '../../data/models/Label'
import Task from '../../data/models/Task'
import Photo from '../../data/models/Photo'
import { taskStatus } from '../../data/dataUtils'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'
import sequelize from '../../data/sequelize'

const router = express.Router()

router.post('/saveLabels', (req, res) => {
  const {labels, photoId, myTaskId} = req.body
  const updatedTime = Date.now()
  for (let i = 0; i < labels.length; i++) {
    labels[i].updatedTime = updatedTime
  }
  return sequelize.transaction(t => {

    return Photo.findById(photoId).then(photo => {
      return photo.getTasks().then(tasks => {
        tasks.map(task => {
          if (task.taskId === myTaskId) {
            task.TaskPhotos.photoStatus = taskStatus.complete
            task.TaskPhotos.updatedTime = updatedTime
            return task.TaskPhotos.save()
          }
        })
      })
    }, {transaction: t}).then(photo => {
      return Label.bulkCreate(labels, {
        returning: true,
        updateOnDuplicate: ['x', 'y', 'angle', 'mirror', 'width','height','updatedTime','id'],
      }, {transaction: t})
    })
  }).then(result => {
    res.json(resBuild(result))
    // Transaction has been committed
  }).catch(err => {
    resErrorBuild(res, 500, err)
    // Transaction has been rolled back
  })
})

router.post('/queryLabels', (req, res) => {
  const {taskId} = req.body
  return Task.findById(taskId).then(task => {
    return task.getPhotos({
      include: [
        {
          model: Label,
          required: true,
          as: 'Labels',
        }],
    }).then(photos => {
      res.json(photos)
    }).catch(err => {
      console.log(err)
      resErrorBuild(res, 500, err)
    })
  })
})

export default router
