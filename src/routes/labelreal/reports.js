import express from 'express'
import Model from '../../data/sequelize'
import __ from 'underscore'

const router = express.Router()

router.post('/export', (req, res) => {
  const {projectId} = req.body
  return Model.query(
    `select
        p.photoId,
         p.syncFileUrl          as url,
         p.size,
         p.width as photoWidth,
         p.height as photoHeight,
         p.mimeType,
         p.protocol,
         p.orientation,
         p.createdAt,
         t2.taskId,
         t2.name                as taskName,
         p2.projectId,
         p2.syncProjectFileName as projectName,
         l.labelId,
         l.x,
         l.y,
         l.angle,
         l.mirror,
         l.width as labelWidth,
         l.height as labelHeight,
         l.spendTime,
         l.polygon,
         s.skuId               as targetId,
         s.name                as targetName,
         s.bizId               as businessId
      from photos as p
       left join taskphotos t on p.photoId = t.photoId
       left join tasks t2 on t.taskId = t2.taskId
       left join projects p2 on t2.projectId = p2.projectId
       left join labels l on p.photoId = l.photoId
       left join skus s on l.skuId = s.skuId
      where t2.projectId = '${projectId}'`,
    {
      type: Model.QueryTypes.SELECT,
    },
  ).then(photoLabels => {
    const groupedLabels = Object.values(__.groupBy(photoLabels, 'photoId'))
    let exportResult = []
    for (let i = 0; i < groupedLabels.length; i++) {
      const groupedLabel = groupedLabels[i]
      if (groupedLabel.length > 0) {
        const {labelId, x, y, angle, mirror, width, height, spendTime, polygon, targetName, targetId, businessId, ...onePhoto} = groupedLabel[0]
        let labels = []
        for (const gLabel of groupedLabel) {
          const {photoId, url, size, width, height, mimeType, protocol, orientation, createdAt, taskId, taskName, projectId, projectName, ...oneLabel} = gLabel
          if (gLabel.labelId !== null)
            labels.push(oneLabel)
        }
        onePhoto['label'] = labels
        exportResult.push(onePhoto)
      }
    }
    res.status(200).
      send({result: 'success', data: { exportResult}})
  })
})
export default router
