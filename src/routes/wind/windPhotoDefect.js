import UserLogin from '../../data/wind/models/WindPhotoDefect';
import express from 'express';
import WindFanPhoto from '../../data/wind/models/FanPhoto';

const router = express.Router();

router.post('/create', (req, res) => {
  const WindPhotoDefectCreation = async done => {
    const WindPhotoDefectAddResult = await UserLogin.create({
      coordinates: req.body.coordinates && req.body.coordinates.trim(),
      defectPosition: req.body.defectPosition && req.body.defectPosition.trim(),
      defectSize: req.body.defectSize && req.body.defectSize.trim(),
      suggestion: req.body.suggestion && req.body.suggestion.trim(),
      level: req.body.level && req.body.level.trim(),
      defectType: req.body.defectType && req.body.defectType.trim(),
      fanPhotoId: req.body.fanPhotoId && req.body.fanPhotoId.trim(),
      defectUniqueNo: req.body.defectUniqueNo && req.body.defectUniqueNo.trim(),
    })
      .then(WindPhotoDefect => ({
        result: 'success',
        obj: WindPhotoDefect,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(WindPhotoDefectAddResult);
  };

  WindPhotoDefectCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: data.obj, msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/delete', (req, res) => {
  const photoDefectDeleteInfo = async done => {
    const photoDefectDeleteResult = await UserLogin.destroy({
      where: { linkId: req.body.linkId && req.body.linkId },
    })
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(photoDefectDeleteResult);
  };

  photoDefectDeleteInfo(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: data.obj, msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/update', (req, res) => {
  const photoUpdateInfo = async done => {
    const photoUpdateResult = await UserLogin.update(
      {
        coordinates: req.body.coordinates && req.body.coordinates.trim(),
        defectPosition:
          req.body.defectPosition && req.body.defectPosition.trim(),
        defectSize: req.body.defectSize && req.body.defectSize.trim(),
        suggestion: req.body.suggestion && req.body.suggestion.trim(),
        level: req.body.level && req.body.level.trim(),
        defectType: req.body.defectType,
        fanPhotoId: req.body.fanPhotoId && req.body.fanPhotoId.trim(),
        defectUniqueNo:
          req.body.defectUniqueNo && req.body.defectUniqueNo.trim(),
      },
      {
        where: { linkId: req.body.linkId },
      },
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({ result: 'error', msg: err.name }));
    done(photoUpdateResult);
  };

  photoUpdateInfo(data => {
    if (data.result === 'success') {
      res.status(200).send({ result: 'success', msg: 'success' });
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

export default router;
