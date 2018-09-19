import RoutingInspect from '../../data/wind/models/RoutingInspect';
import express from 'express';
import { status } from '../../data/dataUtils';

const router = express.Router();

router.post('/create', (req, res) => {
  const RoutingInspectCreation = async done => {
    const RoutingInspectAddResult = await RoutingInspect.create({
      name: req.body.name && req.body.name.trim(),
      inspectDate: req.body.inspectDate,
      factory: req.body.factory && req.body.factory.trim(),
      url: req.body.url && req.body.url.trim(),
      windMachineId: req.body.windMachineId && req.body.windMachineId,
      active: status.active,
    })
      .then(routingInspect => ({
        result: 'success',
        obj: routingInspect,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(RoutingInspectAddResult);
  };

  RoutingInspectCreation(data => {
    if (data.result === 'success') {
      res
        .status(200)
        .send({ result: 'success', msg: 'success', data: data.obj });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
