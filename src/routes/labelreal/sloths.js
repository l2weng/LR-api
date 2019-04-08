import SlothKong from '../../data/models/SlothKong'
import SlothSku from '../../data/models/SlothSku'
import SlothFridge from '../../data/models/SlothFridge'
import express from 'express'
import User from '../../data/models/User'
import UserLogin from '../../data/models/UserLogin'

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
  return SlothSku.findById(slothSkuId).then(slothSku=>{
    return slothSku.update({count:slothSku.count+1}).then(affactRows=>{
      res.status(200).send('success')
    }).catch(err => {
      res.status(500).send('error', err)
    })
  })
})

router.post('/skuUpdate', (req, res) => {
  let {row,col,type} = req.body
  return SlothSku.findOne({
    where: {row,col,type},
  }).then(sku => {
    sku.update({isEmpty: 1}).then(eResult=>{
      res.status(200).send('success')
    })
  })
})

router.post('/fridgeCount', (req, res) => {
  let {slothFridgeId} = req.body
  return SlothFridge.findById(slothFridgeId).then(slothFridge=>{
    return slothFridge.update({openCount:slothFridge.openCount+1}).then(affactRows=>{
      res.status(200).send('success')
    }).catch(err => {
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

export default router
