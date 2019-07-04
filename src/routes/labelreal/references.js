import Reference from '../../data/models/Reference'
import {
  resBuild,
  resErrorBuild,
} from '../../data/dataUtils'
import express from 'express'

const router = express.Router()

router.post('/syncReferences', (req, res) => {
  const {referenceId} = req.body
  try {
    if (referenceId) {
      return Reference.findById(referenceId).then(reference => {
        if (reference) {
          return reference.update({...req.body}).then(reference => {
            res.json(resBuild(reference))
          })
        }
      })
    } else {
      delete req.body.referenceId
      return Reference.create({...req.body}).then(reference => {
        res.json(resBuild(reference))
      })
    }
  } catch (e) {
    resErrorBuild(res, 500, e)
  }
})

export default router
