import GuestMessage from '../../data/models/GuestMessage'
import express from 'express'

const router = express.Router()

router.post('/add', (req, res) => {
  const {name,subject,number,email,message} = req.body
  GuestMessage.create({name,subject, number,email,message}).then(result=>{
    res.status(200).send({result: 'success'})
  })
})

export default router
