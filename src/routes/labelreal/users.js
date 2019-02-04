import User from '../../data/models/User'
import Company from '../../data/models/Company'
import {
  statusDesc,
  userTypeDesc,
  resBuild,
  userType as _userType,
  validateEmail, resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'
import Team from '../../data/models/Team'
import log4js from 'log4js';
const log = log4js.getLogger('app');

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
      resErrorBuild(res,500)
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
          }).catch(err => err)
        }
      })
    } else {
      resErrorBuild(res,400)
    }
  } else {
    userSave()
  }
})

/**
 * req body includes userId, teamId
 * not owner
 */
router.post('/add2team', (req, res) => {
  log.info('xxxxxxxxxx')
  res.sendStatus(200)
  // let {userId,teamId} = this.body
  // Team.findById(teamId).then(team=>{
  //   User.findById(userId).then(user=>{
  //     team.addUser(user)
  //     res.json(resBuild(user))
  //   }).catch(err=> err)
  // }).catch(err=>{
  //   log.error(err)
  //   resErrorBuild(res,400)
  // })
})

export default router
