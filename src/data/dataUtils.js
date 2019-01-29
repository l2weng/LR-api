const userTypeDesc = {'0': 'individual', '1': 'enterprise'}
const userType = {individual: '0', enterprise: '1'}
import Sequelize from 'sequelize'

const Op = Sequelize.Op

// 0:激活状态, 1: 未激活, 2, 冻结
// const status = { active: 0, inactive: 1, locked: 2 };
const statusDesc = {0: 'inactive', 1: 'active', 2: 'locked'}

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
 * @returns {{result: *, message: string, model: string, obj: *}}
 */
function resBuild (obj = null, resType = 0, optType = 0, message = '') {
  return {
    result: resMessage[resType],
    message: `${optTypes[optType]} ${obj.constructor.name} ${message}`,
    model: obj !== null ? obj.constructor.name : '',
    obj,
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
function criteriaBuild (criteria, params={}, type = 0) {
  if (Object.entries(params).length === 0 && params.constructor === Object) {
    return criteria
  }
  let builtCriteria = Object.assign({}, criteria)
  for (let k in params) {
    if (params.hasOwnProperty(k)) {
      if (params[k] !== undefined && params[k] !== '') {
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

export {
  resBuild,
  statusDesc,
  userTypeDesc,
  userType,
  validateEmail,
  getMessageByCode,
  criteriaBuild,
}
