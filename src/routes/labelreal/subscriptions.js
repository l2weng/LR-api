import Subscription from '../../data/models/Subscription'
import express from 'express'

const router = express.Router()

router.post('/add', (req, res) => {
  const {email} = req.body
  return Subscription.findOne({
    where: {email},
  }).then(sub => {
    if(!sub){
      Subscription.create({email})
    }
    res.send(true)
  })
})

export default router
