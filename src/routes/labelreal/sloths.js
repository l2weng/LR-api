import SlothKong from '../../data/models/SlothKong'
import SlothSku from '../../data/models/SlothSku'
import SlothFridge from '../../data/models/SlothFridge'
import express from 'express'

const router = express.Router()

router.post('/skuCreate', (req, res) => {
  return SlothSku.create(req.body).then(slothSku => {
    res.status(200).send('success')
  }).catch(err => {
    res.status(500).send('error', err)
  })
})

router.post('/fridgeCreate', (req, res) => {
  return SlothFridge.create(req.body).then(slothFridge => {
    res.status(200).send('success')
  }).catch(err => {
    res.status(500).send('error', err)
  })
})

router.post('/create', (req, res) => {
  return SlothKong.create(req.body).then(slothKong => {
    res.status(200).send('success')
  }).catch(err => {
    res.status(500).send('error', err)
  })
})

router.post('/skuCount', (req, res) => {
  let {slothSkuId} = req.body
  return SlothSku.findById(slothSkuId).then(slothSku => {
    return slothSku.update({count: slothSku.count + 1}).then(affactRows => {
      res.status(200).send('success')
    }).catch(err => {
      res.status(500).send('error', err)
    })
  })
})

router.post('/skuUpdate', (req, res) => {
  let {row, col, type} = req.body
  return SlothSku.findOne({
    where: {row, col, type},
  }).then(sku => {
    if (sku === null) {
      res.status(404).send({result: 'error', msg: 'sku not exists'})
    } else {
      sku.update({isEmpty: 1}).then(eResult => {
        res.status(200).send('success')
      })
    }
  })
})

router.post('/skuRemoveEmpty', (req, res) => {
  let {slothSkuId} = req.body
  return SlothSku.findById(slothSkuId).then(slothSku => {
    return slothSku.update({isEmpty: 0}).then(affactRows => {
      res.status(200).send('success')
    }).catch(err => {
      res.status(500).send('error', err)
    })
  })
})

router.post('/fridgeCount', (req, res) => {
  let {slothFridgeId} = req.body
  return SlothFridge.findById(slothFridgeId).then(slothFridge => {
    return slothFridge.update({openCount: slothFridge.openCount + 1}).
      then(affactRows => {
        res.status(200).send('success')
      }).
      catch(err => {
        res.status(500).send('error', err)
      })
  })
})

router.post('/remove', (req, res) => {
  let {slothKongId} = req.body
  return SlothKong.destroy({
    where: {
      slothKongId,
    },
    truncate: true,
  }).then(affectedRows => {
    res.status(200).send('success')
  }).catch(err => {
    res.status(500).send('error', err)
  })
})

router.post('/getV2Data', (req, res) => {
  let {type} = req.body
  let baseline = type===0?5400:6000
  let skuInfo = {
    'smartId': type===0?999999:999995,
    'info': {
      'openCount': 0,
      'saleCount': 27,
      'payoffDay': 924,
      'purity': 89.55,
      'cols': type===0?[
        9,
        9,
        9,
        9,
        11,
        11,
      ]:[12,13,13,12,13,14],
      'boxes': [

      ],
    },
  }
  let totalCount = 0
  let totalProfit = 0
  let emptyTotal = 0
  let myBoxes = []
  return SlothSku.findAll({
    where: {type},
    order: [['row', 'ASC'], ['col', 'ASC']],
  }).then(slothSkus => {
    slothSkus.map(sku => {
      totalCount += sku.count
      let tempProfit = sku.count * sku.profit
      totalProfit = totalProfit + tempProfit
      if (sku.isEmpty===1) {
        sku.skuId = 1044059
        emptyTotal += 1
      }
      let oneBox = {skuid: sku.skuId, col: sku.col, row: sku.row}
      myBoxes.push(oneBox)
    })
    let btpResult = 9999
    let btp = baseline / totalProfit
    console.log(btp)
    if(btp<9999&&btp>0){
      btpResult = parseInt(btp)
    }
    SlothFridge.findOne({
      where: {type},
    }).then(slothFridge => {
      skuInfo.info.openCount = slothFridge.openCount
      skuInfo.info.saleCount = totalCount
      skuInfo.info.payoffDay = btpResult
      skuInfo.info.purity = emptyTotal===0?100:parseFloat((1-emptyTotal / slothSkus.length)*100).toFixed(2)
      skuInfo.info.boxes = myBoxes
      res.json(skuInfo)
    })
  })
})

export default router
