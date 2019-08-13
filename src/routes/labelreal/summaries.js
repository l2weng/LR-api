// import Project from '../../data/models/Project'
// import Task from '../../data/models/Task'
// import {
//   resBuild,
//   resErrorBuild,
// } from '../../data/dataUtils'
import Model from "../../data/sequelize";
import express from 'express'
import Project from '../../data/models/Project'
import { resErrorBuild } from '../../data/dataUtils'

const router = express.Router()

/**
 * count sku labelling by projectId
 */
router.post('/countSkus', (req, res) => {
  const {projectId} = req.body
  return Project.findById(projectId).
    then(project => {
      return project.getSkus().then(skus=>{
        const skuIds = skus.map(sku=>sku.skuId)
        if(skuIds.length>0){
          let skuIdString = skuIds.join(',')
          return Model.query(
            `select l.skuId, s.name, s.color, count(*) as count from labels as l join skus as s where l.skuId=s.skuId and l.skuId in (${skuIdString}) group by l.skuId order by s.name desc`,
            {
              type: Model.QueryTypes.SELECT,
            },
          ).then(skuCounts => {
            res.json(skuCounts)
          })
        }else{
          res.json([])
        }
      })
    }).catch(err => {
      resErrorBuild(res, 500, err)
    })
})

/**
 * Count project status by projectId
 */
router.post('/countPhotoStatus', (req, res) => {
  const {projectId} = req.body
  return Model.query(
    `select count(tp.photoId) as count, tp.photoStatus from taskphotos tp where projectId = '${projectId}' group by photoStatus`,
    {
      type: Model.QueryTypes.SELECT,
    },
  ).then(taskStatuses => {
    res.json(taskStatuses)
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
