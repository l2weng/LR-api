import Message from '../../data/models/Message'
import {
  resBuild,
  resErrorBuild, messageType, messageStatus,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()
//
router.post('/inviteUser', (req, res) => {
  const {projectId} = req.body
  let msgObj = {
    status: messageStatus.unread,
    type: messageType.invitation,
    ...req.body,
  }
  return Message.create(msgObj).then(msg => {
    res.json(resBuild(msg))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
