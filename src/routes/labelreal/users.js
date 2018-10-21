import User from '../../data/models/User';
import { windUserDes, status } from '../../data/dataUtils';
import express from 'express';

const router = express.Router();

router.post('/create', (req, res) => {
  const userObj = {
    name: req.body.name && req.body.name.trim(),
    displayName: req.body.displayName && req.body.displayName.trim(),
    type: req.body.type,
    typeDes: windUserDes[req.body.type],
    password: req.body.password && req.body.password.trim(),
    phone: req.body.phone && req.body.phone.trim(),
    email: req.body.email && req.body.email.trim(),
    companyId: req.body.companyId && req.body.companyId,
    active: status.active,
  };
  const userCreation = async done => {
    const userAddResult = await WindUser.create(userObj)
      .then(user => ({
        result: 'success',
        obj: user,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(userAddResult);
  };

  userCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/update', (req, res) => {
  const userUpdateInfo = async done => {
    const userUpdateResult = await WindUser.update(
      {
        name: req.body.name && req.body.name.trim(),
        displayName: req.body.displayName && req.body.displayName.trim(),
        type: req.body.type,
        typeDes: req.body.type && windUserDes[req.body.type],
        phone: req.body.phone && req.body.phone.trim(),
        email: req.body.email && req.body.email.trim(),
      },
      {
        where: { userId: req.body.userId },
      },
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(userUpdateResult);
  };

  userUpdateInfo(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
