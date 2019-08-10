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
  const {projectId} = req.body
  Activity.findAll({
    where: {projectId, type:null}
  }).then(activities => {
    res.json(resBuild(activities))
  })
})

export default router
