// pages/order/order.js
const { activityorders } = require('../../api/activity')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate:"",
    enddate:"",
    inpdata:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  bindDateChangeend: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  bindDateChangestart: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  inp: function(e) {
    console.log('携带值为', e.detail.value)
    this.setData({
      inpdata: e.detail.value
    })
  },
  chaxun(){
    let hh = new Date().getHours()
    let mf = new Date().getMinutes()<10?'0'+new Date().getMinutes():
      new Date().getMinutes()
    let ss = new Date().getSeconds()<10?'0'+new Date().getSeconds():
      new Date().getSeconds()
      let dataTime = `${hh}:${mf}:${ss}`;
      console.log(dataTime)
    var that = this;
    let  startdate = this.data.startdate != ""? this.data.startdate+" "+dataTime :"";
    let  enddate = this.data.enddate != ""? this.data.enddate+" "+dataTime:"";
    let dingdanNO = this.data.inpdata;
    activityorders({
      apikey:"QwFMS5eLS29Dikp6kAi6zhwEouTh5xUY",
      start_time:startdate,
      end_time:enddate,
      query_type:1,
      page:1,
      pageSize:100,
    }).then((activityorders)=>{
      that.setData({
        orderslist: activityorders.data.data
      })
        console.log(activityorders)
    }).catch((error) => {
      console.log("tttttttttttttttttttttttttttttt")
      // console.error(error);
    })
  }
})