import WindVane from '../../data/wind/models/WindVane';
import express from 'express';
import {status} from '../../data/dataUtils';
import FanPhoto from "../../data/wind/models/FanPhoto";

const router = express.Router();

router.post('/create', (req, res) => {
  const WindVaneCreation = async done => {
    const WindVaneAddResult = await WindVane.create({
      name: req.body.name && req.body.name.trim(),
      serialNumber: req.body.serialNumber,
      factory: req.body.factory && req.body.factory.trim(),
      windMachineId: req.body.windMachineId,
      active: status.active,
    })
      .then(WindVane => ({
        result: 'success',
        obj: WindVane,
      }))
      .catch(err => ({result: 'error', msg: err}));
    done(WindVaneAddResult);
  };

  WindVaneCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({result: 'success', msg: 'success', data: data.obj});
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});


router.post('/update', (req, res) => {
  const WindVaneUpdate = async done => {
    const windVaneUpdateResult = await WindVane.update(
      {
        name: req.body.name && req.body.name.trim(),
      },
      {
        where: {windVaneId: req.body.windVaneId}
      }
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({result: 'error', msg: err.name}));
    done(windVaneUpdateResult);
  };

  WindVaneUpdate(data => {
    if (data.result === 'success') {
      res.status(200).send({result: 'success', msg: 'success'});
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.get('/downloadConfig', (req, res) => {
  let vaneId = req.query.vaneId;
  let type = req.query.type;
  let routingInspectId = req.query.routingInspectId;
  console.log(req.query);

  let dJson = {};
  WindVane.findById(vaneId).then(windVane => {
    FanPhoto.findAll({
      where: {windVaneId: parseInt(vaneId), type: parseInt(type), routingInspectId: parseInt(routingInspectId)},
      order: [['sort', 'ASC']]
    }).then(fanPhotos => {
      dJson.windVane = windVane;
      dJson.fanPhotos = fanPhotos;
      dJson.fileManReferer = "http://filewind.clobotics.cn/api/";
      dJson.businessReferer = "http://windapi-server.chinanorth.cloudapp.chinacloudapi.cn/wind/";
      res.setHeader('Content-disposition', 'attachment; filename=config.json');
      res.send(dJson);
    });
  });
})

export default router;
