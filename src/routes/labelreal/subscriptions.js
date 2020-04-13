import Subscription from '../../data/models/Subscription'
import express from 'express'

const router = express.Router()

router.post('/add', (req, res) => {
  const {subscriptionEmail} = req.body
  return Subscription.findOne({
    where: {email:subscriptionEmail},
  }).then(sub => {
    if(!sub){
      Subscription.create({email:subscriptionEmail})
    }
    res.status(200).send({result: 'success'})
  })
})

export default router
