import User from '../../data/models/User';
import Company from '../../data/models/Company';
import {
  statusDesc,
  userTypeDesc,
  resBuild,
  userType as _userType,
  validateEmail,
  resErrorBuild,
} from '../../data/dataUtils';
import log4js from 'log4js';
const log = log4js.getLogger('app');
import express from 'express';
import Team from '../../data/models/Team';

const router = express.Router();

router.post('/create', (req, res) => {
  const { userType, status, email, companyName } = req.body;
  let userObj = {
    userTypeDesc: userTypeDesc[userType],
    statusDesc: statusDesc[status],
    ...req.body,
  };
  const userSave = function() {
    User.create(userObj)
      .then(user => {
        delete user.dataValues.password;
        delete user.dataValues.password_hash;
        res.json(resBuild(user));
      })
      .catch(err => {
        resErrorBuild(res, 500, err);
      });
  };
  if (_userType.enterprise === userType) {
    if (validateEmail(email)) {
      const emailDomain = email.substring(email.lastIndexOf('@') + 1);
      Company.findOne({
        where: { emailDomain },
      })
        .then(company => {
          if (company !== null) {
            userObj = { companyId: company.companyId, ...userObj };
            userSave();
          } else {
            Company.create({ name: companyName, emailDomain })
              .then(company => {
                userObj = { companyId: company.companyId, ...userObj };
                userSave();
              })
              .catch(err => err);
          }
        })
        .catch(err => {
          resErrorBuild(res, 500, err);
        });
    } else {
      resErrorBuild(res, 500, `email validation not exists`);
    }
  } else {
    userSave();
  }
});

/**
 * req body includes userId, teamId
 * not owner
 */
router.post('/add2team', (req, res) => {
  const { userId, teamId } = req.body;
  Team.findById(teamId)
    .then(team => {
      if (team === null) {
        resErrorBuild(res, 500, `team ${teamId} not exists`);
      }
      return User.findById(userId)
        .then(user => {
          team.addUser(user);
          res.json(resBuild(team));
        })
        .catch(err => err);
    })
    .catch(err => {
      resErrorBuild(res, 400, err);
    });
});

/**
 * Add contact to user
 */
router.post('/addContact', (req, res) => {
  const { userId, contactId } = req.body;
  User.findAll({ where: { userId: [userId,contactId] } }).then(users => {
    if(users.length===2){
      users[0].addChildren(users[1],{through: {isOwner:true}})
      delete users[0].dataValues.password_hash
      res.json(resBuild(users[0]));
    }else{
      resErrorBuild(res, 400, `user ${userId} , ${contactId} not exist`)
    }
  }).catch(err => {
    resErrorBuild(res, 400, err);
  });
});

export default router;
