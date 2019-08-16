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
router.post('/countSkus', (req, res) => {
  const {projectId} = req.body
  return Project.findById(projectId).
    then(project => {
      return project.getSkus().then(skus => {
        const skuIds = skus.map(sku => sku.skuId)
        if (skuIds.length > 0) {
          let skuIdString = skuIds.join(',')
          return Model.query(
            `select l.skuId, s.name, s.color, count(*) as count from labels as l join skus as s where l.skuId=s.skuId and l.skuId in (${skuIdString}) group by l.skuId order by s.name desc`,
            {
              type: Model.QueryTypes.SELECT,
            },
          ).then(skuCounts => {
            res.json(skuCounts)
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
                           where up.isOwner is not true
                             and up.projectId = '${projectId}'))
group BY ut.userId, tp.photoStatus`,
    {
      type: Model.QueryTypes.SELECT,
    },
  ).then(userStatuses => {
    let cObj = {}
    let res = userStatuses.reduce(function (obj, v) {
      obj[v.userId] = (obj[v.userId] || 0) + v.photoCount
      if (v.photoStatus === 0) {
        cObj[v.userId] = {name: v.name, open: v.photoCount, userId: v.userId}
      }
      return obj
    }, {})
    for (const userId of Object.keys(res)) {
      cObj[userId].total = res[userId]
      cObj[userId].submitted = cObj[userId].total - cObj[userId].open
      cObj[userId].procentage = Math.floor(Number((cObj[userId].total - cObj[userId].open) / cObj[userId].total * 100))
    }
    response.json(Object.values(cObj))
  }).catch(err => {
    console.log(err)
    resErrorBuild(res, 500, err)
  })
})

export default router
