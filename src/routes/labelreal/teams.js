import User from '../../data/models/User'
import Company from '../../data/models/Company'
import {
  statusDesc,
  userTypeDesc,
  resBuild,
  userType as _userType,
  validateEmail, getMessageByCode,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/create', (req, res) => {
  const {userType, status, email, companyName} = req.body
  let userObj = {
    userTypeDesc: userTypeDesc[userType],
    statusDesc: statusDesc[status],
    ...req.body,
  }
  let userSave = function () {
    User.create(userObj).then(user => {
      delete user.dataValues.password
      delete user.dataValues.password_hash
      res.json(resBuild(user))
    }).catch(err => {
      res.status(500).send(err)
    })
  }
  if (_userType.enterprise === userType) {
    if (validateEmail(email)) {
      let emailDomain = email.substring(email.lastIndexOf('@') + 1)
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
          }).catch(err => {
            res.status(500).send(err)
          })
        }
      })
    } else {
      res.status(400).send(getMessageByCode(400))
    }
  } else {
    userSave()
  }
})

export default router
