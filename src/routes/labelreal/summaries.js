// import Project from '../../data/models/Project'
// import Task from '../../data/models/Task'
// import {
//   resBuild,
//   resErrorBuild,
// } from '../../data/dataUtils'
import Model from '../../data/sequelize'
import express from 'express'
import Project from '../../data/models/Project'
import { resErrorBuild } from '../../data/dataUtils'

const router = express.Router()

/**
 * count sku labelling by projectId
 */
router.post('/countTargets', (req, res) => {
  const {projectId} = req.body
  return Project.findById(projectId).
    then(project => {
      return project.getSkus().then(skus => {
        const skuIds = []
        let initCountArray = []
        for (const sku of skus) {
          skuIds.push(sku.skuId)
          initCountArray.push({skuId:sku.skuId,name:sku.name,color:sku.color,count:0})
        }
        if (skuIds.length > 0) {
          let skuIdString = skuIds.join(',')
          return Model.query(
            `select l.skuId, s.name, s.color, count(*) as count from labels as l join skus as s where l.skuId=s.skuId and l.skuId in (${skuIdString}) group by l.skuId order by s.name desc`,
            {
              type: Model.QueryTypes.SELECT,
            },
          ).then(skuCounts => {
            if(skuCounts>0){
              for (const initCount of initCountArray) {
                for (const skuCount of skuCounts) {
                  if(initCount.skuId === skuCount.skuId){
                    initCount.name = skuCount.name
                    initCount.color = skuCount.color
                    initCount.count = skuCount.count
                    break
                  }
                }
              }
            }
            res.json(initCountArray)
          })
        } else {
          res.json([])
        }
      })
    }).catch(err => {
      resErrorBuild(res, 500, err)
    })
})

/**
 * Count photo status by projectId
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

/**
 * Count photo status group by user
 */
router.post('/countUserPhotoStatus', (req, response) => {
  const {projectId} = req.body
  return Model.query(
    `select count(*) photoCount, us.name, us.userId, tp.photoStatus
from taskphotos as tp
         left join usertasks as ut on ut.taskId = tp.taskId
         left join users as us on us.userId = ut.userId
where tp.taskId in (select taskId
                    from usertasks
                    where projectId = '${projectId}'
                      and userId in
                          (select up.userId
                           from userprojects as up
                           where up.projectId = '${projectId}'))
group BY ut.userId, tp.photoStatus`,
    {
      type: Model.QueryTypes.SELECT,
    },
  ).then(userStatuses => {
    let res = userStatuses.reduce(function (obj = {total:0, submitted:0, percentage:0}, v) {
      obj[v.userId] = {
        total: ((obj[v.userId] ?  obj[v.userId].total
          : 0 ) + v.photoCount),
        submitted: v.photoStatus === 2||v.photoStatus === 1 ? ((obj[v.userId]
          ? obj[v.userId].submitted : 0) + v.photoCount) : 0,
        userId: v.userId,
        name: v.name,
      }
      return obj
    }, {})
    for (const userId of Object.keys(res)) {
      res[userId].open = res[userId].total - res[userId].submitted
      res[userId].percentage = Math.floor(Number((res[userId].submitted) / res[userId].total * 100))
    }
    response.json(Object.values(res))
  }).catch(err => {
    console.log(err)
    resErrorBuild(res, 500, err)
  })
})

export default router
