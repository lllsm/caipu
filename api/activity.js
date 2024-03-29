const {
  request
} = require('../http/request.js')
module.exports = {
  // 登录
  // login: (params) => request('user/login', 'GET', params, true),
  // 注册
  // register: (params) => request('user/register', 'GET', params , true),
  // 获取验证码
  // getCode: (params) => request('user/code', 'GET', params , true)


  // 活动列表
  activitylist: (params) => request('act_list', 'GET', params, true),

  //活动转链接口
  activitydetails: (params) => request('act', 'GET', params, true),

  //活动订单
  activityorders: (params) => request('orders', 'GET', params)
}