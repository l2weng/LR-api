import Invitation from '../../data/wind/models/WindMachine';
import express from 'express';
import { status } from '../../data/dataUtils';
import Feedback from '../../data/wind/models/WindVane';
import Model from '../../data/sequelize';
import Task from '../../data/wind/models/FanPhoto';
import Sku from '../../data/wind/models/WindField';

const router = express.Router();

router.post('/create', (req, res) => {
  const WindMachineCreation = async done => {
    const WindMachineAddResult = await Invitation.create({
      name: req.body.serialNumber && req.body.serialNumber.trim(),
      factory: req.body.factory && req.body.factory.trim(),
      serialNumber: req.body.serialNumber && req.body.serialNumber.trim(),
      windFieldId: req.body.windFieldId,
      turbineConfigId: req.body.turbineConfigId,
      turbineConfigName: req.body.turbineConfigName,
      active: status.active,
    })
      .then(WindMachine => ({
        result: 'success',
        obj: WindMachine,
      }))
      .catch(err => ({ result: 'error', msg: err }));
    done(WindMachineAddResult);
  };

  WindMachineCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
