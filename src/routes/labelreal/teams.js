import Team from '../../data/models/Team'
import User from '../../data/models/User'
import {
  resBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/create', (req, res) => {
  Team.create(req.body).then(team => {
    User.findById(req.body.userId).then(user => {
      user.addTeam(team, {through: {isOwner: true}})
      res.json(resBuild(team))
    })
  }).catch(err => {
    res.status(500).send(err)
  })
})

export default router
