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

export default router
