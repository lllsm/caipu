const { baseUrl } = require('./env').prod
module.exports = {
  request : function(url, method = 'GET', data = {}){
    let fullUrl = `${baseUrl}${url}`
    let token = wx.getStorageSync('token') ? wx.getStorageSync('token')  : ''
    return new Promise((resolve,reject)=>{
      wx.request({
        url: fullUrl,
        method,
        data,
        header: {
          'content-type': 'application/json', // 默认值
          'x-api-key': token,
        },
        success(res){
          if (res.data.code == 200) {
            resolve(res.data)
          }else{
            // wx.showToast({
            //   title: res.data.msg,
            //   icon:'none'
            // })
            wx.showToast({
              title: '获取成功',
              icon:'none'
            })
            reject(res.data.message)
          }
        },
        fail(){
          wx.showToast({
            title: '接口请求错误',
            icon:'none'
          })
          reject('接口请求错误')
        }
      })
    })
  }
}