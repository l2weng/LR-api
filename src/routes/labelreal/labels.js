import Label from '../../data/models/Label'
import Photo from '../../data/models/Photo'
import {taskStatus} from '../../data/dataUtils'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'
import sequelize from '../../data/sequelize';

const router = express.Router()

router.post('/saveLabels', (req, res) => {
  const {labels, photoId, myTaskId} = req.body
  return sequelize.transaction(t => {

    // chain all your queries here. make sure you return them.
    return Photo.findById(photoId).then(photo => {
      console.log(photo)
      return photo.getTasks().then(tasks => {
        tasks.map(task=>{
          if(task.taskId = myTaskId){
            task.TaskPhotos.photoStatus = taskStatus.complete
            return task.TaskPhotos.save()
          }
        })
      })
    }, {transaction: t}).then(photo => {
      return Label.bulkCreate(labels, {returning: true}, {transaction: t});
    })
  }).then(result => {
    res.json(resBuild(result))
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
  }).catch(err => {
    console.log(err)
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
  });
  // return Photo.findById(photoId).then(photo => {
  //   return photo.getTasks().then(tasks => {
  //     tasks.map(task=>{
  //       if(task.taskId = myTaskId){
  //         task.TaskPhotos.photoStatus = taskStatus.complete
  //         return task.TaskPhotos.save()
  //       }
  //     })
  //   })
  // }).then(photo=>{
  //   return Label.bulkCreate(labels, {returning: true}).then(labels => {
  //     res.json(resBuild(labels))
  //   }).catch(err => {
  //     resErrorBuild(res, 500, err)
  //   })
  // })
})

export default router
