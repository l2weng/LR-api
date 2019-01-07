import User from '../../data/models/User';
import {
  statusDesc,
  userTypeDesc,
  resBuild,
  // userType as _userType,
} from '../../data/dataUtils';
import express from 'express';

const router = express.Router();

router.post('/create', (req, res) => {
  const { userType, status } = req.body;
  const userObj = {
    userTypeDesc: userTypeDesc[userType],
    statusDesc: statusDesc[status],
    ...req.body,
  };
  // if (_userType.enterprise === userType) {
  // }

  User.create(userObj)
    .then(user => {
      delete user.dataValues.password;
      delete user.dataValues.password_hash;
      res.json(resBuild(user));
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
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

export default router;
