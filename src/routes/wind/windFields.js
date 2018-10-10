import Sku from '../../data/wind/models/WindField';
import express from 'express';
import { status } from '../../data/dataUtils';
import WindFanPhoto from '../../data/wind/models/FanPhoto';

const router = express.Router();

router.post('/create', (req, res) => {
  const WindFieldCreation = async done => {
    const WindFieldAddResult = await Sku.create({
      name: req.body.name && req.body.name.trim(),
      serialNumber: req.body.serialNumber && req.body.serialNumber.trim(),
      province: req.body.province && req.body.province.trim(),
      companyId: req.body.companyId && req.body.companyId,
      active: status.active,
    })
      .then(WindField => ({
        result: 'success',
        obj: WindField,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(WindFieldAddResult);
  };

  WindFieldCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/update', (req, res) => {
  Sku.findById(req.body.windFieldId).then(windField => {
    windField
      .update({
        name: req.body.name ? req.body.name.trim() : windField.name,
        serialNumber: req.body.serialNumber && req.body.serialNumber.trim(),
        province: req.body.province && req.body.province.trim(),
        fieldDefectCache:
          req.body.fieldDefectCache && req.body.fieldDefectCache.trim(),
      })
      .then(result =>
        res.status(200).send({ result: 'success', msg: 'success' }),
      )
      .catch(err => {
        console.log(err);
        res.status(500).send({ result: 'error', msg: err.name });
      });
  });
});

router.post('/updateMachineCache', (req, res) => {
  Sku.findById(req.body.windFieldId).then(windField => {
    if (windField.fieldDefectCache !== '') {
      windField
        .update({
          fieldDefectCache: '',
        })
        .then(result =>
          res.status(200).send({ result: 'success', msg: 'success' }),
        )
        .catch(err => {
          console.log(err);
          res.status(500).send({ result: 'error', msg: err.name });
        });
    } else {
      res.status(200).send({ result: 'success', msg: 'success' });
    }
  });
});

router.post('/active', (req, res) => {
  const WindFieldUpdateStatus = async done => {
    const WindFieldActiveStatus = await Sku.update(
      {
        active: req.body.status === 'active' ? status.active : status.inactive,
      },
      { where: { windField: req.body.windField } },
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(WindFieldActiveStatus);
  };

  WindFieldUpdateStatus(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
