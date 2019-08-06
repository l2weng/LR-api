import Project from '../../data/models/Project'
import User from '../../data/models/User'
import Label from '../../data/models/Label'
import {
  generateColor,
  resBuild,
  resErrorBuild,
  statusDesc,
  userTypeDesc,
  userType,
  status,
  resUpdate,
} from '../../data/dataUtils'
import express from 'express'
import path from 'path'
import _ from 'underscore'
import Model from '../../data/sequelize'

const router = express.Router()

router.post('/create', (req, res) => {
  const {userId, machineId, projectFile, name} = req.body
  const fileUuid = path.win32.basename(projectFile, '.lbr')
  let projectObj = {name, fileUuid ,syncVersion: Date.now(), ...req.body}
  Project.create(projectObj).then(project => {
    //创建方式, createType:0 means has userId, createType:1 means only has machineId
    if (!_.isEmpty(userId)) {
      return User.findById(userId).then(user => {
        user.addProjects(project, {through: {isOwner: true}})
        res.json(resBuild(project))
      })
    } else {
      return User.findOne({
        where: {machineId},
      }).then(user => {
        if (!_.isEmpty(user)) {
          return User.findById(user.userId).then(user => {
            user.addProjects(project, {through: {isOwner: true}})
            res.json(resBuild(project))
          })
        } else {
          let userObj = {
            userTypeDesc: userTypeDesc[userType.temporary],
            userType: userType.temporary,
            statusDesc: statusDesc[status.temp],
            avatarColor: generateColor(),
            machineId,
            name: machineId,
          }
          return User.create(userObj).then(user => {
            user.addProjects(project, {through: {isOwner: true}})
            res.json(resBuild(project))
          })
        }
      })
    }
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/update', (req, res) => {
  const {projectId} = req.body
  return Project.update({...req.body}, {
    where: {projectId},
  }).then(project => {
    res.json(resUpdate(project))
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

router.post('/syncLocalProject', (req, res) => {
  const {file, id, owner, cover} = req.body
  return Project.findOne({where: {localProjectId: id}}).then(project => {
    if (project) {
      if(!project.cover&&cover){
        return project.update({cover:cover}).then(project=>{
          res.json({project})
        })
      }else{
        res.json({project})
      }
    } else {
      return User.findById(owner).then(user => {
        return user.getProjects(
          {
            joinTableAttributes: ['isOwner'],
            order: [['createdAt', 'DESC']],
          }).
          then(projects => {
            projects.map(project => {
              if (project.projectFile === file) {
                project.update({
                  cover:cover?cover:project.cover,
                  localProjectId: id,
                }).then(project => {
                  res.json({project})
                })
              }
            })
          })
      }).catch(err => {
        resErrorBuild(res, 500, err)
      })
    }
  })
})

router.post('/syncProject', (req, res) => {
  const {syncStatus, syncProjectFile, projectFile, itemCount, syncProjectId, name, syncProjectFileName, syncCover, syncProjectSize} = req.body
  return Project.findById(syncProjectId).then(project => {
    return project.update({
      syncStatus,
      syncProjectFile,
      projectFile,
      itemCount,
      name,
      syncProjectFileName,
      syncProjectSize,
      syncCover,
      syncVersion: Date.now(),
    }).then(project => {
      res.json(resBuild(project))
    })
  }).catch(err => {
    resErrorBuild(res, 500, err)
  })
})

/**
 * Add colleague to project
 */
router.post('/addColleague', (req, res) => {
  const {colleagueId, localProjectId} = req.body
  return Project.findOne({where: {localProjectId: localProjectId}}).
    then(project => {
      return User.findById(colleagueId).then(colleague => {
        project.addUser(colleague)
        res.json(resBuild(project))
      })
    }).
    catch(err => {
      resErrorBuild(res, 500, err)
    })
})

export default router
