import Sku from '../../data/models/Sku'
import Project from '../../data/models/Project'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/create', (req, res) => {
  const {projectId} = req.body
  return Sku.create({...req.body}).then(sku => {
    Project.findById(projectId).then(project=>{
      sku.addProject(project).then(sku=>{
        res.json(resBuild(sku))
      })
    })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

export default router
