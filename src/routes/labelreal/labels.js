import Label from '../../data/models/Label'
import Task from '../../data/models/Task'
import Photo from '../../data/models/Photo'
import { labelStatus } from '../../data/dataUtils'
import { resBuild, resErrorBuild } from '../../data/dataUtils'
import express from 'express'
import sequelize from '../../data/sequelize'

const router = express.Router()

router.post('/saveLabels', (req, res) => {
  const {labels, photoId, myTaskId, status} = req.body
  const updatedTime = Date.now()
  for (let i = 0; i < labels.length; i++) {
    labels[i].updatedTime = updatedTime
    labels[i].status = status
  }
  return sequelize.transaction(t =>
    Photo.findById(photoId).then(
      photo =>
        photo.getTasks().then(tasks => {
          tasks.map(task => {
            if (task.taskId === myTaskId) {
              task.TaskPhotos.photoStatus = labelStatus.submitted
              task.TaskPhotos.updatedTime = updatedTime
              task.TaskPhotos.projectId = task.projectId
              return task.TaskPhotos.save()
            }
          })
        }),
      {transaction: t},
    ).then(photo =>
      Label.bulkCreate(
        labels,
        {
          returning: true,
          updateOnDuplicate: [
            'x',
            'y',
            'angle',
            'mirror',
            'width',
            'height',
            'updatedTime',
            'id',
          ],
        },
        {transaction: t},
      ),
    ),
  ).then(result => {
    res.json(resBuild(result))
    // Transaction has been committed
  }).catch(err => {
    resErrorBuild(res, 500, err)
    // Transaction has been rolled back
  })
})

router.post('/queryLabels', (req, res) => {
  const {taskId} = req.body
  return Task.findById(taskId).then(task =>
    task.getPhotos({
      include: [
        {
          model: Label,
          required: true,
          as: 'Labels',
        },
      ],
    }).then(photos => {
      res.json(photos)
    }).catch(err => {
      console.log(err)
      resErrorBuild(res, 500, err)
    }),
  )
})

router.post('/skipLabel', (req, res) => {
  const {photoId, myTaskId} = req.body
  const updatedTime = Date.now()
  return Photo.findById(photoId).then(
    photo =>
      photo.getTasks().then(tasks => {
        tasks.map(task => {
          if (task.taskId === myTaskId) {
            task.TaskPhotos.photoStatus = labelStatus.skipped
            task.TaskPhotos.updatedTime = updatedTime
            task.TaskPhotos.projectId = task.projectId
            task.TaskPhotos.save()
            res.json(photo)
          }
        })
      })
  ).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
