import Team from '../../data/models/Team'
import {
  resBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/create', (req, res) => {
  Team.create(req.body).then(team => {
    res.json(resBuild(team))
  }).catch(err => {
    res.status(500).send(err)
  })
})

export default router
