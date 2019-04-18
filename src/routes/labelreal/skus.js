import Task from '../../data/models/Sku'
import {
  resBuild,
  resErrorBuild,
  taskStatus,
} from '../../data/dataUtils'
import express from 'express'
import Sequelize from 'sequelize'

const Op = Sequelize.Op


const router = express.Router()

router.post('/create', (req, res) => {
  Task.create({workStatus: taskStatus.open, ...req.body}).then(task => {
    res.json(resBuild(task))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})


export default router
