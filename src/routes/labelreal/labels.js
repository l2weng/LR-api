import Label from '../../data/models/Label'
import Task from '../../data/models/Task'
import Photo from '../../data/models/Photo'
import User from '../../data/models/User'
import Activity from '../../data/models/Activity'
import {
  activityCategory,
  photoStatus,
  labelStatus,
  resUpdate,
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'
import sequelize from '../../data/sequelize'
import __ from 'underscore'

const router = express.Router()

let saveActivities = function (
  userId, photoId, projectId, myTaskId, spendTime, result, updatedTime,
  newActivityLabels, photoName) {
  let needSaveActivities = []
  User.findById(userId).then(user => {
    Activity.findOne({where: {userId, photoId, taskId:myTaskId}}).then(activity => {
      if (!activity) {
        Activity.create({
          category: activityCategory.photo,
          photoId,
          projectId,
          taskId: myTaskId,
          userId: userId,
          role: '同事',
          userName: user.name,
          spendTime,
          photoName,
          count: result.length,
          finishedTime: updatedTime,
        })
      } else {
        activity.update({
          spendTime: activity.spendTime + spendTime,
          count: result.length,
          finishedTime: updatedTime,
        })
      }
    })
    for (const label of result) {
      if (__.contains(newActivityLabels, label.id)) {
        needSaveActivities.push({
          type: label.status,
          category: activityCategory.label,
          labelId: label.labelId,
          photoId,
          projectId,
          taskId: myTaskId,
          userId: userId,
          role: '同事',
          userName: user.name,
          spendTime: label.spendTime,
          count: 1,
          finishedTime: label.updatedTime,
        })
      }
    }
    if (needSaveActivities.length > 0) {
      Activity.bulkCreate(
        needSaveActivities,
        {
          returning: true,
        },
      )
    }
  })
}

router.post('/savePhotoLabels', (req, res) => {
  const {labels, photoId, myTaskId, spendTime} = req.body
  const updatedTime = Date.now()
  let projectId = ''
  let userId = ''
  let newActivityLabels = []
  let cPhoto = {}

  for (let i = 0; i < labels.length; i++) {
    let lab = labels[i]
    if (lab.status === labelStatus.new) {
      newActivityLabels.push(lab.id)
    }
    lab.updatedTime = updatedTime
    lab.status = labelStatus.saved
    if (!userId) {
      userId = lab.userId
    }
  }
  return sequelize.transaction(t =>
    Photo.findById(photoId).then(
      photo =>
        photo.getTasks().then(tasks => {
          tasks.map(task => {
            if (task.taskId === myTaskId) {
              task.TaskPhotos.photoStatus = photoStatus.submitted
              task.TaskPhotos.updatedTime = updatedTime
              task.TaskPhotos.spendTime += spendTime
              task.TaskPhotos.projectId = task.projectId
              cPhoto = photo
              if (!projectId) {
                projectId = task.projectId
              }
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
            'spendTime',
          ],
        },
        {transaction: t},
      ),
    ),
  ).then(result => {
    saveActivities(userId, photoId, projectId, myTaskId, spendTime, result,
      updatedTime, newActivityLabels,cPhoto.syncFileName)
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

router.post('/remove', (req, res) => {
  const updatedTime = Date.now()
  const {labelId} = req.body
  return Label.update({status: labelStatus.delete, updatedTime}, {
    where: {labelId},
  }).then(label => {
    res.json(resUpdate(label))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/revert', (req, res) => {
  const {labelId, status} = req.body
  return Label.update({status}, {
    where: {labelId},
  }).then(label => {
    res.json(resUpdate(label))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
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
      }),
  ).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
