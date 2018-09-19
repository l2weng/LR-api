import PremiseConfig from '../../data/wind/models/PremiseConfig';
import express from 'express';
import { status } from '../../data/dataUtils';

const router = express.Router();

router.post('/create', (req, res) => {
  const PremiseConfigCreation = async done => {
    const PremiseConfigAddResult = await PremiseConfig.create({
      serverName: req.body.serverName && req.body.serverName.trim(),
      serverAddress: req.body.serverAddress,
      version: req.body.version,
      port: req.body.port,
      operationSystem: req.body.operationSystem,
      details: req.body.details,
      companyId: req.body.companyId && req.body.companyId,
      active: status.active,
    })
      .then(PremiseConfig => ({
        result: 'success',
        obj: PremiseConfig,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(PremiseConfigAddResult);
  };

  PremiseConfigCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/update', (req, res) => {
  const PremiseConfigUpdate = async done => {
    const PremiseConfigUpdateResult = await PremiseConfig.update(
      {
        serverName: req.body.serverName && req.body.serverName.trim(),
        serverAddress: req.body.serverAddress,
        version: req.body.version,
        port: req.body.port,
        operationSystem: req.body.operationSystem,
        details: req.body.details,
      },
      {
        where: { premiseConfigId: req.body.premiseConfigId },
      },
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(PremiseConfigUpdateResult);
  };

  PremiseConfigUpdate(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

//active or inactive user with para status 'active' or 'inactive'
router.post('/active', (req, res) => {
  console.log("req:",req);
  const premiseUpdateStatus = async done => {
    const premiseActiveStatus = await PremiseConfig.update(
      { active: req.body.status === 'active' ? status.active : status.inactive },
      { where: {premiseConfigId: req.body.premiseConfigId} }
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({result: 'error', msg: err.name}));
    done(premiseActiveStatus);
  };

  premiseUpdateStatus(data => {
    if (data.result === 'success') {
      res.status(200).send({result: 'success', msg: 'success'});
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
