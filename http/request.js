const { baseUrl } = require('./env').prod
 
// 封装ajax
module.exports = {
  request: function(url, method = 'POST', data = {}, isLoading = true) {
    // 操作url
    var url = `${baseUrl}/${url}`
    // 操作data
    var data = data
    console.log(url,data)
    if (isLoading) wx.showLoading({ title: '加载中...' })
    return new Promise((resolve, reject)=>{
      wx.request({
        url: url,
        method: method,
        data: data,
        header: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          if (res.statusCode === 200 && res.data.code === 1) {
            resolve(res.data)
            wx.hideLoading()
          } else {
            wx.showToast({
              title: '接口有问题',
              icon: 'none'
            })
            reject(res)
            wx.hideLoading()
          }
        },
        fail() {
          wx.showToast({
            title: '接口有问题',
            icon: 'none'
          })
          reject(res)
          wx.hideLoading()
        }
      })
    })
  }
}