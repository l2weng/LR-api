import Label from '../../data/models/Label'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/saveLabels', (req, res) => {
  const {labels} = req.body
  return Label.bulkCreate(JSON.parse(labels), {returning: true}).then(labels=>{
    res.json(resBuild(labels))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
