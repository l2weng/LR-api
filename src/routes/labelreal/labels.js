import Label from '../../data/models/Label'
import Task from '../../data/models/Task'
import Photo from '../../data/models/Photo'
import User from '../../data/models/User'
import Activity from '../../data/models/Activity'
import {
  activityCategory,
  photoStatus,
  taskStatus,
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
  return User.findById(userId).then(async user => {
    let parentId = ''
    await Activity.findOne(
      {
        where: {
          userId,
          photoId,
          taskId: myTaskId,
          category: activityCategory.photo,
        },
      }).then(async activity => {
      if (!activity) {
        return await Activity.create({
          category: activityCategory.photo,
          type: labelStatus.photoSubmit,
          photoId,
          projectId,
          taskId: myTaskId,
          userId: userId,
          role: user.userType,
          userName: user.name,
          spendTime,
          photoName,
          count: result.length,
          finishedTime: updatedTime,
        }).then(_activity => { parentId = _activity.activityId })
      } else {
        parentId = activity.activityId
        return await activity.update({
          type: labelStatus.photoSubmit,
          spendTime: (activity.spendTime + parseFloat(spendTime)).toFixed(2),
          count: result.length,
          finishedTime: updatedTime,
        })
      }
    })
    for (const label of result) {
      if (__.contains(newActivityLabels, label.id)) {
        needSaveActivities.push({
          type: label.status,
          category: label.type,
          labelId: label.labelId,
          parentId,
          photoId,
          projectId,
          taskId: myTaskId,
          userId: userId,
          role: user.userType,
          userName: user.name,
          spendTime: label.spendTime,
          count: 1,
          finishedTime: label.updatedTime,
        })
      }
    }
    if (needSaveActivities.length > 0) {
      return Activity.bulkCreate(
        needSaveActivities,
        {
          returning: true,
        },
      )
    }
  })
}

router.post('/savePhotoLabels', (req, res) => {
  const {labels, photoId, spendTime, myTaskId, userId} = req.body
  const updatedTime = Date.now()
  let projectId = ''
  let newActivityLabels = []
  let cPhoto = {}

  for (let i = 0; i < labels.length; i++) {
    let lab = labels[i]
    if (lab.status === labelStatus.new) {
      newActivityLabels.push(lab.id)
    }
    if (!lab.updatedTime) {
      lab.updatedTime = updatedTime
    }
    lab.status = labelStatus.saved
  }
  let saveTaskPhotoStatus = function (task, photo) {
    if (task.workStatus === taskStatus.open) {
      return task.update({workStatus: taskStatus.working})
    }
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
  return sequelize.transaction(t =>
    Photo.findById(photoId).then(
      photo =>
        photo.getTasks().then(tasks => {
          tasks.map(task => {
            if (task.taskId === myTaskId) {
              return saveTaskPhotoStatus(task, photo)
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
            'skuId',
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
      updatedTime, newActivityLabels, cPhoto.syncFileName)
    res.json(resBuild(result))
    // Transaction has been committed
  }).catch(err => {
    resErrorBuild(res, 500, err)
    // Transaction has been rolled back
  })
})

router.post('/queryLabels', (req, res) => {
  const {taskId} = req.body
  if (__.isEmpty(taskId)) {
    return res.json([])
  }
  return Task.findById(taskId).then(task => {
      if (__.isEmpty(task)) {
        return res.json([])
      }
      return task.getPhotos({
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
      })
    },
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
  const {photoId, myTaskId, spendTime, userId} = req.body
  const updatedTime = Date.now()
  return Photo.findById(photoId).then(
    photo =>
      photo.getTasks().then(tasks => {
        tasks.map(task => {
          if (task.taskId === myTaskId) {
            task.TaskPhotos.photoStatus = photoStatus.skipped
            task.TaskPhotos.updatedTime = updatedTime
            task.TaskPhotos.projectId = task.projectId
            task.TaskPhotos.spendTime += spendTime
            task.TaskPhotos.save()
            User.findById(userId).then(user => {
              Activity.create({
                category: activityCategory.photo,
                type: labelStatus.photoSkip,
                photoId,
                projectId: task.projectId,
                taskId: myTaskId,
                userId: userId,
                role: user.userType,
                userName: user.name,
                spendTime,
                photoName: photo.syncFileName,
                count: 0,
                finishedTime: updatedTime,
              })
            })
            res.json(photo)
          }
        })
      }),
  ).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
