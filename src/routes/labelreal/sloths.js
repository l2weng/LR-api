import SlothKong from '../../data/models/SlothKong'
import SlothSku from '../../data/models/SlothSku'
import express from 'express'

const router = express.Router()

router.post('/skuCreate', (req, res) => {
  return SlothSku.create(req.body).then(slothSku => {
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
      if(affactRows>0){
        res.status(200).send('success')
      }else {
        res.status(500).send('error')
      }
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
