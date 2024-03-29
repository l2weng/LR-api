import Sku from '../../data/models/Sku'
import Project from '../../data/models/Project'
import {
  resBuild,
  resErrorBuild, resRemove,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/create', (req, res) => {
  const {projectId} = req.body
  return Sku.create({...req.body}).then(sku => {
    Project.findById(projectId).then(project=>{
      sku.addProject(project).then(sku=>{
        res.json(resBuild(sku[0][0]))
      })
    })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('' +
  '/remove', (req, res) => {
  const {skuId} = req.body
  return Sku.destroy({
    where: { skuId},
  }).then(result=>{
    res.json(resRemove(result))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
