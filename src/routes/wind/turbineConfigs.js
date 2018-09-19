import TurbineConfig from '../../data/wind/models/TurbineConfig';
import express from 'express';
import { status } from '../../data/dataUtils';

const router = express.Router();

router.post('/create', (req, res) => {
  const TurbineConfigCreation = async done => {
    const TurbineConfigAddResult = await TurbineConfig.create({
      name: req.body.name && req.body.name.trim(),
      vaneLength: req.body.vaneLength,
      pixelLength: req.body.pixelLength,
      active: status.active,
    })
      .then(TurbineConfig => ({
        result: 'success',
        obj: TurbineConfig,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(TurbineConfigAddResult);
  };

  TurbineConfigCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/update', (req, res) => {
  const TurbineConfigUpdate = async done => {
    const TurbineConfigUpdateResult = await TurbineConfig.update(
      {
        name: req.body.name && req.body.name.trim(),
        vaneLength: req.body.vaneLength,
        pixelLength: req.body.pixelLength,
      },
      {
        where: { turbineConfigId: req.body.turbineConfigId },
      },
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(TurbineConfigUpdateResult);
  };

  TurbineConfigUpdate(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
