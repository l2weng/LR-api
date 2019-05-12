// import Project from '../../data/models/Project'
// import Task from '../../data/models/Task'
// import {
//   resBuild,
//   resErrorBuild,
// } from '../../data/dataUtils'
import Model from "../../data/sequelize";
import express from 'express'

const router = express.Router()

router.post('/query', (req, res) => {
  const {projectId} = req.body
  return Model.query(
    'select count(*), photoStatus from taskphotos where projectId =:projectId group by photoStatus',
    {
      replacements: {
        projectId,
      },
      type: Model.QueryTypes.SELECT,
    },
  ).then(photoSummarys => {
    res.json(photoSummarys)
  })
})

export default router
