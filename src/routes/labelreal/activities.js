import Activity from '../../data/models/Activity'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/create', (req, res) => {
  return Activity.create({...req.body}).then(activity => {
    res.json(resBuild(activity))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/queryLog', (req, res) => {
  const {projectId, page, results, sortField, sortOrder} = req.body
  Activity.findAndCountAll({
    where: {projectId, type:null},
    order: [[sortField, sortOrder === 'descend' ? 'DESC' : 'ASC']],
    offset: page,
    limit: results,
  }).then(result => {
    res.json(resBuild(result.rows, 0, 3, '', result.count))
  })
})

export default router
