import Photo from '../../data/wind/models/DefectType';
import express from 'express';
import { status } from '../../data/dataUtils';

const router = express.Router();

router.post('/create', (req, res) => {
  const DefectTypeCreation = async done => {
    const DefectTypeAddResult = await Photo.create({
      name: req.body.name && req.body.name.trim(),
      suggestion: req.body.suggestion && req.body.suggestion.trim(),
      level: req.body.level && req.body.level.trim(),
      companyId: req.body.companyId && req.body.companyId,
      active: status.active,
    })
      .then(DefectType => ({
        result: 'success',
        obj: DefectType,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(DefectTypeAddResult);
  };

  DefectTypeCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/update', (req, res) => {
  const DefectTypeUpdate = async done => {
    const DefectTypeUpdateResult = await Photo.update(
      {
        name: req.body.name && req.body.name.trim(),
        suggestion: req.body.suggestion && req.body.suggestion.trim(),
        level: req.body.level && req.body.level.trim(),
      },
      {
        where: { defectTypeId: req.body.defectTypeId },
      },
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(DefectTypeUpdateResult);
  };

  DefectTypeUpdate(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
