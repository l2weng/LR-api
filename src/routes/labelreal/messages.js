import Message from '../../data/models/Message'
import Sequelize from 'sequelize'
import {
  resErrorBuild, messageType, messageStatus, resUpdate,
} from '../../data/dataUtils'
import express from 'express'
import sequelize from '../../data/sequelize'
import User from '../../data/models/User'
const Op = Sequelize.Op;

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
  const {result, messageId, userId, createdBy} = req.body
  const status = messageStatus.read
  return sequelize.transaction(t => {
    return Message.update({status, result}, {
      where: {messageId},
    }, {transaction: t}).then(message => {
      return User.findAll({
        where: {
          userId: {
            [Op.or]: [createdBy, userId]
          }
        }
      }).then(users=>{
        if(users.length===2){
          users[0].addContacts(users[1], {through: {isOwner: true}})
        }
      })
    })
  }).then(result => {
    res.status(200).send({result: 'success'})
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
