import Company from '../../data/wind/models/Company';
import express from 'express';
import {status} from '../../data/dataUtils';

const router = express.Router();

router.post('/create', (req, res) => {
  const CompanyCreation = async done => {
    const CompanyAddResult = await Company.create({
      name: req.body.name && req.body.name.trim(),
      type: req.body.type && req.body.type.trim(),
      active: status.active
    })
      .then(Company => ({
        result: 'success',
        obj: Company,
      }))
      .catch(err => ({result: 'error', msg: err.name}));
    done(CompanyAddResult);
  };

  CompanyCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({result: 'success', msg: 'success'});
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
