import Label from '../../data/models/Label'
import Photo from '../../data/models/Photo'
import {taskStatus} from '../../data/dataUtils'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/saveLabels', (req, res) => {
  const {labels, photoId, myTaskId} = req.body
  return Photo.findById(photoId).then(photo => {
    return photo.getTasks().then(tasks => {
      tasks.map(task=>{
        if(task.taskId = myTaskId){
          task.TaskPhotos.photoStatus = taskStatus.complete
          return task.TaskPhotos.save()
        }
      })
    })
  }).then(photo=>{
    return Label.bulkCreate(labels, {returning: true}).then(labels => {
      res.json(resBuild(labels))
    }).catch(err => {
      resErrorBuild(res, 500, err)
    })
  })
})

export default router
