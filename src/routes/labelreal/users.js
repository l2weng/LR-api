import User from '../../data/models/User'
import Company from '../../data/models/Company'
import {
  statusDesc,
  userTypeDesc,
  resBuild,
  userType as _userType,
  validateEmail,
  resErrorBuild,
  generateColor,
} from '../../data/dataUtils'
import express from 'express'
import Team from '../../data/models/Team'

const router = express.Router()

router.post('/create', (req, res) => {
  const {userType, status, email, companyName} = req.body
  let userObj = {
    userTypeDesc: userTypeDesc[userType],
    statusDesc: statusDesc[status],
    avatarColor: generateColor(),
    ...req.body,
  }
  const userSave = function () {
    return User.create(userObj).then(user => {
      res.json(resBuild(user))
    }).catch(err => {
      resErrorBuild(res, 500, err)
    })
  }
  if (_userType.enterprise === userType) {
    if (validateEmail(email)) {
      const emailDomain = email.substring(email.lastIndexOf('@') + 1)
      Company.findOne({
        where: {emailDomain},
      }).then(company => {
        if (company !== null) {
          userObj = {companyId: company.companyId, ...userObj}
          userSave()
        } else {
          Company.create({name: companyName, emailDomain}).then(company => {
            userObj = {companyId: company.companyId, ...userObj}
            userSave()
          }).catch(err => err)
        }
      }).catch(err => {
        resErrorBuild(res, 500, err)
      })
    } else {
      resErrorBuild(res, 500, `not a right email`)
    }
  } else {
    userSave()
  }
})

router.post('/createAdd2Contact', (req, res) => {
  const {userType, status, ownerId, companyId} = req.body
  const userObj = {
    userTypeDesc: userTypeDesc[userType],
    statusDesc: statusDesc[status],
    avatarColor: generateColor(),
    ...req.body,
  }
  return User.create(userObj).then(user => {
    delete user.dataValues.password
    delete user.dataValues.password_hash
    return User.findById(ownerId).then(owner => {
      owner.addContacts(user, {through: {isOwner: true, companyId}})
      res.json(resBuild(user))
    }).catch(err => err)
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

/**
 * req body includes userId, teamId
 * not owner
 */
router.post('/add2team', (req, res) => {
  const {userId, teamId} = req.body
  Team.findById(teamId).then(team => {
    if (team === null) {
      resErrorBuild(res, 500, `team ${teamId} not exists`)
    }
    return User.findById(userId).then(user => {
      team.addUser(user)
      res.json(resBuild(team))
    }).catch(err => err)
  }).catch(err => {
    resErrorBuild(res, 400, err)
  })
})

/**
 * Add contact to user
 */
router.post('/addContact', (req, res) => {
  const {userId, contactId, companyId} = req.body
  return User.findAll({where: {userId: [userId, contactId]}}).then(users => {
    if (users.length === 2) {
      users[0].addContacts(users[1], {
        through: {isOwner: true, companyId},
      })
      delete users[0].dataValues.password_hash
      res.json(resBuild(users[0], 0, 1))
      return null
    }
    resErrorBuild(res, 400, `user ${userId} , ${contactId} not exist`)
  }).catch(err => {
    resErrorBuild(res, 400, err)
  })
})

export default router
