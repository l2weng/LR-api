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
//
// router.post('/update', (req, res) => {
//   const userUpdateInfo = async done => {
//     const userUpdateResult = await WindUser.update(
//       {
//         name: req.body.name && req.body.name.trim(),
//         displayName: req.body.displayName && req.body.displayName.trim(),
//         type: req.body.type,
//         typeDes: req.body.type && windUserDes[req.body.type],
//         phone: req.body.phone && req.body.phone.trim(),
//         email: req.body.email && req.body.email.trim(),
//       },
//       {
//         where: { userId: req.body.userId },
//       },
//     )
//       .then(result => ({
//         result: 'success',
//         obj: result,
//       }))
//       .catch(err => ({ result: 'error', msg: err.name }));
//     done(userUpdateResult);
//   };
//
//   userUpdateInfo(data => {
//     if (data.result === 'success') {
//       res.status(200).send({ result: 'success', msg: 'success' });
//     } else if (data.result === 'error') {
//       res.status(500).send(data);
//     }
//   });
// });

export default router
