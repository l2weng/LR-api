import Activity from '../../data/models/Activity'
import {
  labelStatus, photoStatus,
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import moment from 'moment'
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
  //default set as last 7 hours
  let sqlContent = `select DATE_FORMAT(updatedAt,'%H:%i:%s') Time, Count(*) SumCount FROM activities
WHERE type!=${labelStatus.photoLevel} and projectId='${projectId}' and updatedAt > (DATE(NOW()) - INTERVAL 1 DAY )
GROUP BY hour(updatedAt)`
  if (type && type === 'DD') {
    sqlContent =
      `select DATE_FORMAT(updatedAt,'%d/%m/%Y') Time, Count(*) SumCount FROM activities
WHERE type!=${labelStatus.photoLevel} and projectId='${projectId}' and updatedAt > (DATE(NOW()) - INTERVAL 7 DAY )
GROUP BY day(updatedAt)`
  }
  return Model.query(
    sqlContent,
    {
      type: Model.QueryTypes.SELECT,
    },
  ).then(activityData => {
    res.json(activityData)
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/queryLog', (req, res) => {
  const {projectId, page, results, sortField, sortOrder} = req.body
  let _offset = (page - 1) * results
  console.log(_offset)
  console.log(_offset+results)
  Activity.findAndCountAll({
    where: {projectId, type: labelStatus.photoLevel},
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
    console.log('....',result.count)
    res.json(resBuild(result.rows, 0, 3, '', result.count))
  })
})

export default router
