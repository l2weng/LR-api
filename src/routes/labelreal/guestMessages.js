import GuestMessage from '../../data/models/GuestMessage'
import express from 'express'

const router = express.Router()

router.post('/add', (req, res) => {
  GuestMessage.create({...req.body}).then(result=>{
    res.status(200).send({result: 'success'})
  })
})

export default router
