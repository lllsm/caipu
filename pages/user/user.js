Page({
    data: {

    },
    onLoad: function(i) {
      wx.setStorageSync('key', '5321')
    },
    onShow: function() {
    },
    hulian(){
      wx.navigateToMiniProgram(
        {
          appId: "wxd2523f83d27e3690",
          path: "/pages/home/home",
        }
      )
    },
    hulian2(){
      wx.navigateToMiniProgram(
        {
          appId: "wxd30ec01beb10c29a",
          path: "/pages/index/index",
        }
      )
    },
    dingdan(){
      var that = this;
      this.setData({isshow:!that.data.isshow})
    },
    tiaozhuan(e){
      var that = this;
      var pass = wx.getStorageSync('key');
      console.log(pass)
      console.log(e.detail)
      if(pass == e.detail ){
        wx.showToast({
          title: "你就是大佬！",
          icon: "none"
        })
        wx.navigateTo({
          url: '/pages/order/order',
        })
      }else{
        wx.showToast({
          title: "密码错误，傻了吧！",
          icon: "none"
        })
      }
  
  
    },
});