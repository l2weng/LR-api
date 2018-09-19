import WindMachine from '../../data/wind/models/WindMachine';
import express from 'express';
import {status} from '../../data/dataUtils';
import WindVane from '../../data/wind/models/WindVane';
import Model from '../../data/wind/sequelize';
import FanPhoto from '../../data/wind/models/FanPhoto';
import WindField from "../../data/wind/models/WindField";

const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const axios = require('axios');

const Image = Canvas.Image;
const router = express.Router();

router.post('/create', (req, res) => {
  const WindMachineCreation = async done => {
    const WindMachineAddResult = await WindMachine.create({
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
      .catch(err => ({result: 'error', msg: err}));
    done(WindMachineAddResult);
  };

  WindMachineCreation(data => {
    if (data.result === 'success') {
      res.status(200).send({result: 'success', msg: 'success'});
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

router.post('/updateExportStatus', (req, res) => {
  const WindMachineUpdate = async done => {
    const windMachineUpdateResult = await WindMachine.update(
      {
        exportStatus: 3,
      },
      {
        where: {windMachineId: req.body.windMachineId}
      }
    )
      .then(result => ({
        result: 'success',
        obj: result,
      }))
      .catch(err => ({result: 'error', msg: err.name}));
    done(windMachineUpdateResult);
  };

  WindMachineUpdate(data => {
    if (data.result === 'success') {
      res.status(200).send({result: 'success', msg: 'success'});
    } else if (data.result === 'error') {
      res.status(500).send(data);
    }
  });
});

const generateImg = async function (url, photoId, coordinates, done) {
  const Jimp = require('jimp');
  const img = new Image();
  const position = JSON.parse(coordinates);
  let cPoint = getMidPoint(position.x, position.y, position.width, position.height,0);
  img.onload = async () => {
    //自动缩放对焦
    // const canvas = Canvas.createCanvas(300, 200);
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 3;
    ctx.strokeRect(position.x, position.y, position.width, position.height);
    //自动缩放对焦
    // ctx.strokeRect(150-position.width/2, 100-position.height/2, position.width, position.height);
    const newImageUrl = path.join(__dirname, `${photoId}.png`);
    const pngStream = await fs.createWriteStream(newImageUrl);
    await canvas.createPNGStream().pipe(pngStream);
    await pngStream.on('close', async () => {
      console.log(`${photoId}.png done`);
      done(true);
    });
  };
  img.onerror = err => {
    console.log(err);
  };
  axios({
    method: 'get',
    url,
    responseType: 'stream',
  }).then(response => {
    const picStream = fs.createWriteStream(
      path.join(__dirname, `${photoId}.jpg`),
    );
    response.data.pipe(picStream);
    picStream.on('close', async () => {
      await Jimp.read(path.join(__dirname, `${photoId}.jpg`))
        .then(image => {
          //自动缩放对焦
          // let cx = 0;
          // let cy = 0;
          // if ((cPoint.px - 150) > 0) {
          //   cx = cPoint.px-150;
          // }
          // if((cPoint.py-100)>0){
          //   cy = cPoint.py-100;
          // }
          // image.rotate(180).resize(600, 400).crop(cx, cy, 300, 200 ).write(path.join(__dirname, `${photoId}_rotated.jpg`), () => {
          image.rotate(180).resize(600, 400).write(path.join(__dirname, `${photoId}_rotated.jpg`), () => {
            img.src = path.join(__dirname, `${photoId}_rotated.jpg`);
          });
        })
        .catch(err => {
          // handle an exception
        });
    });
  });
};

function getMidPoint(/*int*/ x, /*int*/ y, /*int*/ width, /*int*/ height, /*int(in degrees)*/ angle) {
  width = width / 2;
  height = height / 2;
  let dist = Math.sqrt((Math.pow(width, 2)) + (Math.pow(height, 2)));
  let degtorad = Math.PI / 180;
  x += Math.cos(degtorad * (45 + angle)) * dist;
  y += Math.sin(degtorad * (45 + angle)) * dist;
  return {px: x, py: y};

}

router.get('/downloadReport', (req, res) => {
  let query = req.query;
  res.download(query.fileAddress);
})

router.post('/exportReport', (req, res) => {
  const reportInfo = req.body;
  const criteria = {windMachineId: reportInfo.windMachineId};
  WindVane.findAll({
    where: criteria,
    order: [['windVaneId', 'ASC']],
  }).then(windVanes => {
    if (windVanes.length > 0) {
      for (let i = 0; i < windVanes.length; i++) {
        const windVane = windVanes[i];
        reportInfo[`vane${i}`] = windVane.name;
      }
      if (reportInfo.routingInspectId) {
        Model.query(
          'select * from WindPhotoDefects where fanPhotoId in (select fanPhotoId from WindFanPhotos  where routingInspectId =:routingInspectId and needReport=1)',
          {
            replacements: {
              routingInspectId: reportInfo.routingInspectId,
            },
            type: Model.QueryTypes.SELECT,
          },
        ).then(photoDefects => {
          if (photoDefects.length > 0) {
            WindMachine.update({exportStatus: 1},
              {where: {windMachineId: reportInfo.windMachineId}})
              .then(result => {
                console.log('start exporting')
              })
              .catch(err => ({result: 'error', msg: err.name}));
          }
          let results = [];
          for (let i = 0; i < photoDefects.length; i++) {
            FanPhoto.findById(photoDefects[i].fanPhotoId).then(
              fanPhoto => {
                // url:`http://${host}/#dashboard/vaneDetail?windVaneId=${fanPhoto.windVaneId}&type=${fanPhoto.type}&inspectId=${fanPhoto.routingInspectId}&windFieldId=${reportInfo.windFieldId}&windMachineId=${reportInfo.windMachineId}`
                generateImg(
                  fanPhoto.thumbUrl,
                  photoDefects[i].linkId,
                  photoDefects[i].coordinates,
                  (data) => {
                    results.push(data);
                    if (results.length === photoDefects.length) {
                      reportInfo.clients = photoDefects;
                      let now = new Date();
                      reportInfo.currentDate = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日';
                      generateWord(reportInfo, reportInfo.routingInspectId, reportInfo.windMachineId, reportInfo.windFieldId);
                    }
                  }
                ).then(() => {
                  photoDefects[i].photo = path.join(
                    __dirname,
                    `${photoDefects[i].linkId}.png`,
                  );
                  photoDefects[i].photoAddress =  path.join(__dirname);
                  photoDefects[i].blankLine = '';
                  photoDefects[i].vaneNo = fanPhoto.windVaneId;
                })
              },
            )
          }
        });
      }
    } else {
      res.status(200).send({result: 'noVanes', msg: 'success'});
    }
  });
  res.status(200).send({result: 1, msg: 'success'});
});

let generateWord = function (dataSource, fileName, windMachineId, windFieldId) {
  console.log('generating word file');
  const Docxtemplater = require('docxtemplater');
  const ImageModule = require('docxtemplater-image-module');
  const JSZip = require('jszip');

  const opts = {};
  opts.centered = false;
  opts.getImage = function (tagValue, tagName) {
    try {
      return fs.readFileSync(tagValue);
    } catch (e) {
      return fs.readFileSync(`${exportPath}/image.png`);
    }
  };

  opts.getSize = function (img, tagValue, tagName) {
    return [300, 200];
  };

  const imageModule = new ImageModule(opts);
  let exportPath = path.resolve(__dirname, 'public');
  let content;
  try {
    content = fs.readFileSync(`${exportPath}/rt.docx`, 'binary');
  }catch (e) {
    exportPath = path.resolve(__dirname, '../public');
    content = fs.readFileSync(`${exportPath}/rt.docx`, 'binary');
  }
  const zip = new JSZip(content);
  const docx = new Docxtemplater()
    .attachModule(imageModule)
    .loadZip(zip)
    .setData(dataSource)
    .render();
  const buffer = docx.getZip().generate({type: 'nodebuffer'});
  try {
    let fileUrl = `${exportPath}/${dataSource.windField}风场 ${dataSource.turbine}机组叶片检查报告.docx`;
    fs.writeFile(fileUrl, buffer);
    WindMachine.update({exportStatus: 2, exportedWordUrl: fileUrl},
      {where: {windMachineId: windMachineId}})
      .then(result => {
        console.log(`${dataSource.windField}风场 ${dataSource.turbine}机组叶片检查报告.docx report exported`)
        WindField.findById(windFieldId).then(windField => {
          windField.update({
            fieldDefectCache: null
          }).then(()=>{
            console.log('all done, start remove cache image');
            for (let i = 0; i < dataSource.clients.length; i++) {
              const val = dataSource.clients[i];
              let fileFirstName = `${val.photoAddress}/${val.linkId}`;
              let fileLastName = ['.jpg', '.png', '_rotated.jpg'];
              for (let j = 0; j < fileLastName.length; j++) {
                const lastNameElement = fileLastName[j];
                fs.unlink(`${fileFirstName}${lastNameElement}`, (err) => {
                  if (err) throw err;
                  console.log(`${fileFirstName}${lastNameElement} was deleted`);
                });
              }
            }


          }).catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => ({result: 'error', msg: err.name}));
    return fileUrl;
  } catch (e) {
    return 'error';
  }
};

export default router;
