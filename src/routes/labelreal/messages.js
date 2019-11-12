import Message from '../../data/models/Message'
import {
  resErrorBuild, messageType, messageStatus, resUpdate,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

/**
 * invite Friend
 */
router.post('/inviteFriend', (req, res) => {
  let msgObj = {
    status: messageStatus.unread,
    type: messageType.invitation,
    ...req.body,
  }
  return Message.create(msgObj).then(msg => {
    res.send(true)
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/updateInvitation', (req, res) => {
  const {result, messageId} = req.body
  const status = messageStatus.read
  return Message.update({status, result}, {
    where: {messageId},
  }).then(message => {
    res.json(resUpdate(message))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

/**
 * check if new message or not
 */
router.post('/checkNewMsg', (req, res) => {
  const {userId} = req.body
  return Message.findAll({
    where: {userId, status: messageStatus.unread},
  }).then(msgs => {
    res.send(msgs && msgs.length > 0)
  })
})

export default router
