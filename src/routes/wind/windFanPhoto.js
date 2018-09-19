import WindFanPhoto from '../../data/wind/models/FanPhoto';
import express from 'express';
import {status, windUserDes} from '../../data/dataUtils';
import Sequelize from 'sequelize';
import WindUser from "../../data/wind/models/User";
import Model from "../../data/wind/sequelize";

const router = express.Router();

router.post('/create', (req, res) => {
  const WindFanPhotoCreation = async done => {
    const WindFanPhotoAddResult = await WindFanPhoto.create({
      name: req.body.name && req.body.name.trim(),
      type: req.body.type,
      orientation: req.body.orientation,
      sort: req.body.sort,
      url: req.body.url && req.body.url.trim(),
      thumbUrl: req.body.thumbUrl && req.body.thumbUrl.trim(),
      midUrl: req.body.midUrl && req.body.midUrl.trim(),
      windVaneId: req.body.windVaneId,
      routingInspectId: req.body.routingInspectId,
      isBig: req.body.isBig,
      active: status.active,
      needReport:req.body.needReport,
    })
      .then(WindFanPhoto => ({
        result: 'success',
        obj: WindFanPhoto,
      }))
      .catch(err => ({ result: 'error', msg: err }));
    done(WindFanPhotoAddResult);
  };

  WindFanPhotoCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(200).send({ result: 'already exists', msg: 'success' });
    }
  });
});

const Op = Sequelize.Op;

router.post('/delete', (req, res) => {
  const ids = req.body.pIds;
  WindFanPhoto.findAll({
    where: { fanPhotoId: { [Op.in]: ids } },
  })
    .then(fanPhotos => {
      const updatePromises = fanPhotos.map(photo => photo.destroy());
      return Sequelize.Promise.all(updatePromises);
    })
    .then(updateResults => {
      res.status(200).send({ result: 'success', msg: 'success' });
    })
    .catch(err => {
      res.status(500).send({ result: 'error', msg: err.name });
    });
});

router.post('/sort', (req, res) => {
  const sortNumbers = req.body.pSortNumbers;
  const ids = [];
  const keys = Object.keys(sortNumbers);
  keys.map(key => {
    ids.push(key);
  });
  WindFanPhoto.findAll({
    where: { fanPhotoId: { [Op.in]: ids } },
  })
    .then(fanPhotos => {
      const updatePromises = fanPhotos.map((photo, index) =>
        photo.update({ sort: sortNumbers[photo.fanPhotoId] }),
      );
      return Sequelize.Promise.all(updatePromises);
    })
    .then(updateResults => {
      res.status(200).send({ result: 'success', msg: 'success' });
    })
    .catch(err => {
      res.status(500).send({ result: 'error', msg: err.name });
    });
});

router.post('/update', (req, res) => {
  console.log(req.body);
  const photoUpdateInfo = async done => {
    const photoUpdateResult = await WindFanPhoto.update(
      {
        isMask: req.body.isMask,
        originMaskUrl: req.body.originMaskUrl && req.body.originMaskUrl.trim(),
        stitchingMaskUrl: req.body.stitchingMaskUrl && req.body.stitchingMaskUrl.trim(),
        needReport: req.body.needReport && req.body.needReport,
        hasDefect: req.body.hasDefect && req.body.hasDefect,
        postFlightCVStatus: req.body.postFlightCVStatus && req.body.postFlightCVStatus.trim(),
      },
      {
        where: {fanPhotoId: req.body.fanPhotoId}
      }
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({result: 'error', msg: err.name}));
    done(photoUpdateResult);
  };

  photoUpdateInfo(data => {
    if (data.result === 'success') {
      res.status(200).send({result: 'success', msg: 'success'});
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/getOnePathJsonData', (req, res) => {
  const photoQuery = req.body;
  console.log(photoQuery);
  return Model.query(
    'select * from WindFanPhotos where isBig is null and type =:type and windVaneId=:blade',
    {
      replacements: {
        type:parseInt(photoQuery.type),
        blade:parseInt(photoQuery.blade)
      }, 
      type: Model.QueryTypes.SELECT,
    },
  ).then(windFanPhotos => {
    res.status(200).send({result: 'success', photos: windFanPhotos});
  });
});

export default router;
