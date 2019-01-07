const userTypeDesc = { '0': 'individual', '1': 'enterprise' };
const userType = { individual: '0', enterprise: '1' };

// 0:激活状态, 1: 未激活, 2, 冻结
// const status = { active: 0, inactive: 1, locked: 2 };
const statusDesc = { 0: 'inactive', 1: 'active', 2: 'locked' };

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

const resMessage = { 0: 'success', 1: 'failure' };
const optTypes = { 0: 'create', 1: 'update', 3: 'read', 4: 'delete' };

function resBuild(obj = null, resType = 0, optType = 0, message = '') {
  return {
    result: resMessage[resType],
    message: `${optTypes[optType]} ${obj.constructor.name} ${message}`,
    model: obj !== null ? obj.constructor.name : '',
    obj,
  };
}

export { resBuild, statusDesc, userTypeDesc, userType };
