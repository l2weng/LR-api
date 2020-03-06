import Sequelize from 'sequelize'
import _ from 'underscore'

const Op = Sequelize.Op

import log4js from 'log4js'

const log = log4js.getLogger('app')

const userType = {individual: 0, enterprise: 1, temporary: 2}
const userTypeDesc = {0: 'individual', 1: 'enterprise', 2: 'temporary'}
//type:0 means 基本标注类型, 1 means 可能对错类型
const commonStatus = {active: 0, removed: 1}
// 0:激活状态, 1: 未激活, 2, 冻结
const status = {inactive: 0, active: 1, locked: 2, temp: 3}
//3 is means temp account just have machineId
const statusDesc = {0: 'inactive', 1: 'active', 2: 'locked', 3: 'temp'}
const photoStatus = {open: 0, skipped: 1, submitted: 2}
const messageStatus = {unread: 0, read: 1}
const messageType = {invitation: 0, system: 1}
const labelStatus = {
  new: 0,
  remove: 1,
  update: 2,
  saved: 3,
  photoSkip: 998,
  photoSubmit: 999,
}
const taskStatus = {open: 0, working: 1, complete: 2, confirmed: 3}
const activityCategory = {photo: 999, label: 0, polygon: 1, video: 2}
const taskCategory = {all: 0, my: 1, assigned: 2}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
const enCodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

function getMessageByCode (code = 200, lang) {
  return lang === 'en' ? enCodeMessage[code] : codeMessage[code]
}

const resMessage = {0: 'success', 1: 'failure'}
const optTypes = {0: 'create', 1: 'update', 3: 'read', 4: 'delete'}

/**
 * express response build
 * @param obj
 * @param resType
 * @param optType
 * @param message
 * @param total
 * @returns {{result: *, message: string, model: string, obj: *}}
 */
function resBuild (
  obj = null, resType = 0, optType = 0, message = '', total = 0) {
  return {
    result: resMessage[resType],
    message: `${optTypes[optType]} ${obj.constructor.name} ${message}`,
    model: obj.constructor.name,
    total,
    obj,
  }
}

function resUpdate (updateResult = [], resType = 0) {
  if (updateResult.length > 0) {
    return {
      result: resMessage[resType],
      message: 'Update success',
    }
  }
}

function resRemove (affactLine) {
  return {
    result: resMessage[affactLine > 0 ? 0 : 1],
    message: `Remove ${resMessage[affactLine > 0 ? 0 : 1]}`,
  }
}

/**
 * email validation
 * @param email
 * @returns {boolean}
 */
function validateEmail (email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * Build criteria sentence
 * @param criteria
 * @param params e.g {userId:1, password:2}
 * @param type 0 means string match, 1 means like
 * @returns {*} e.g { phone: { [Symbol(like)]: '%18929192221%' },userId: { [Symbol(like)]: '%33%' },name: 'Louis' }
 */
function criteriaBuild (criteria, params = {}, type = 0) {
  if (Object.entries(params).length === 0 && params.constructor === Object) {
    return criteria
  }
  let builtCriteria = Object.assign({}, criteria)
  for (let k in params) {
    if (params.hasOwnProperty(k)) {
      if (!_.isEmpty(params[k])) {
        let p = {}
        if (type === 0) {
          p[k] = params[k]
        } else if (type === 1) {
          p[k] = {[Op.like]: `%${params[k]}%`}
        }
        builtCriteria = Object.assign(p, builtCriteria)
      }
    }
  }
  return builtCriteria
}

function generateColor () {
  return '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
}

function resErrorBuild (res, statusCode, err = '') {
  log.error(err)
  res.status(statusCode).send(getMessageByCode(statusCode))
}

function getReqId (req) {
  let ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  return ip.replace(/^.*:/, '')
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export {
  resBuild,
  resErrorBuild,
  resUpdate,
  resRemove,
  labelStatus,
  photoStatus,
  taskStatus,
  status,
  statusDesc,
  userTypeDesc,
  userType,
  commonStatus,
  validateEmail,
  getMessageByCode,
  criteriaBuild,
  generateColor,
  taskCategory,
  activityCategory,
  messageStatus,
  messageType
}
