import Activity from '../../data/models/Activity'
import {
  labelStatus,
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'
import Model from '../../data/sequelize'

const router = express.Router()

router.post('/create', (req, res) => {
  return Activity.create({...req.body}).then(activity => {
    res.json(resBuild(activity))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/queryByDate', (req, res) => {
  const {type, projectId} = req.body
  let sqlContent = `select updatedAt Time, Count(*) SumCount FROM activities
WHERE type!=${labelStatus.photoSubmit} and projectId='${projectId}' and updatedAt > (DATE(NOW()) - INTERVAL 1 HOUR )
GROUP BY minute (updatedAt) order by updatedAt`
  if (type && type === 'DD') {
    sqlContent = `select updatedAt Time, Count(*) SumCount FROM activities
WHERE type!=${labelStatus.photoSubmit} and projectId='${projectId}' and updatedAt > (DATE(NOW()) - INTERVAL 1 DAY )
GROUP BY hour(updatedAt) order by updatedAt`
  }
  if (type && type === '7D') {
    sqlContent =
      `select DATE_FORMAT(updatedAt,'%d/%m/%Y') Time, Count(*) SumCount FROM activities
WHERE type!=${labelStatus.photoSubmit} and projectId='${projectId}' and updatedAt > (DATE(NOW()) - INTERVAL 7 DAY )
GROUP BY day(updatedAt) order by updatedAt`
  }
  if (type && type === 'MM') {
    sqlContent =
      `select DATE_FORMAT(updatedAt,'%d/%m/%Y') Time, Count(*) SumCount FROM activities
WHERE type!=${labelStatus.photoSubmit} and projectId='${projectId}' and updatedAt > (DATE(NOW()) - INTERVAL 1 MONTH )
GROUP BY day(updatedAt) order by updatedAt`
  }
  if (type && type === 'YY') {
    sqlContent =
      `select DATE_FORMAT(updatedAt,'%m/%Y') Time, Count(*) SumCount FROM activities
WHERE type!=${labelStatus.photoSubmit} and projectId='${projectId}' and updatedAt > (DATE(NOW()) - INTERVAL 1 YEAR )
GROUP BY month(updatedAt) order by updatedAt`
  }
  return Model.query(
    sqlContent,
    {
      type: Model.QueryTypes.SELECT,
    },
  ).then(activityData => {
    res.json({activityType: type, activityData})
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/queryLog', (req, res) => {
  const {projectId, page, results, sortField, sortOrder} = req.body
  let _offset = (page - 1) * results
  Activity.findAndCountAll({
    where: {projectId, type: [labelStatus.photoSubmit, labelStatus.photoSkip]},
    order: [[sortField, sortOrder === 'descend' ? 'DESC' : 'ASC']],
    distinct: true,
    offset: _offset,
    limit: _offset + results,
    include: [
      {
        model: Activity,
        as: 'children',
      },
    ],
  }).then(result => {
    res.json(resBuild(result.rows, 0, 3, '', result.count))
  })
})

export default router
