
let timer = null
import { getNum } from '../../utils/util'
const { activitylist,activitydetails } = require('../../api/activity')
let urlPromise = null

Page({

  data: {
    pageNum: 1,
    activitylist:[],
		totallPages: '',
    animated2: '',
    animated1: '',
    xsI: 1,
    xsaa: 1,
    img: '../../imgs/sl.png',
    global_top: '28px',
    current: "",
    isFirst: true,
    isshow:false,
    processing: false,
    act: 0,
    list: [
      "吃土",
      "多少斤了你心里没数吗",
      "看看兜里有多少钱",
      "我说吃啥你也不会吃",
      "小浣熊干脆面",
      "西北风",
      "最便宜的",
      "🐂🥩",
      "💣🐔",
      "🍡",
      "去吃米其林..",
      "修仙",
      "明天再吃",
      "蹭饭",
      "鲱🐟罐头",
      "吃啥啊，健身去",
      "饿一天",
      "别吃小面条",
      "老八秘制小汉堡",
      "吃狗粮",
      "奥利..奥",
      "吃..个教训",
      "🥗沙拉",
      "酸菜鱼",
      "披萨"
    ],
    xs: [
      '赶高铁，点了一份外卖，结果一直没到，我跟商家说取消吧，我高铁时间到了，商家：我通知下骑手，做好追高铁的准备...',
      '在e了么点了份外卖，半个小时过去了还没送到，我发消息给骑手问什么原因？ 骑手：雨太大，送不了，推荐您点隔壁美团... 我：美团能送？ 骑手：对呀，他们要钱不要命的...',
      '我：麻烦帮我带罐可乐。 骑手：好的，带几瓶？ 我：带两瓶，一瓶给你。 骑手：好的，那我要1.5L的...',
      '出差到重庆，点了份外卖，结果外卖小哥就在我发他的位置周边画圈圈，我一个电话过去问他什么意思？小哥说他迷路了...',
      '电话给外面小哥，我：你怎么回事呀？ 骑手：在你小区楼下被一条狗拦住了，我一动它就咬。 我：我不信，你动一下试试？ 骑手：好，你听着哈，汪汪汪...汪汪汪...',
      '今天参加了个电动车竞速比赛，毫无意外的拿了冠军，颁奖的时候主持人问我技术在哪练的？ 我：都是自学成才，因为我是送外卖的...',
      '有一小哥点了一份不麻不辣的麻辣烫，外卖小哥送的有点儿迟了，在门口拿着单子说.不好意思啊，你要的不麻不辣的麻辣烫现在也不烫了。',
      '这年头，能在宿舍，公司楼下默默等着你，给你送上温热的早饭午饭晚饭，不管严寒酷暑刮风下雨总会很耐心的男人——只会是送外卖的。',
      '一天中午我们寝室大哥打电话叫了份外卖，隔了很久了还没送来。于是就又打过去想催催，结果发现自己手机竟然停机了。在大哥到处找人交话费的时候，他电话响了，是那个送外卖的！是的，送外卖的为了找到他，给他交了10块话费……',
    ],
    //外卖数据字段
    miniData: [],
    canyinData:[
      {
        //美团
        "appId": "wxde8ac0a21135c07d",
        "path": "/index/pages/h5/h5?lch=cps:waimai:5:65c5f4b9271221c79eae104d969a48a3:16571jutuikewx:33:85459&weburl=https%3A%2F%2Fdpurl.cn%2F0QUNUlAz&f_userId=1&f_token=1",
        "name": "美团外卖红包天天领",
        //这里改成你的链接
      },
      {
        "appId": "wxde8ac0a21135c07d",
        //这里改成你的链接
        "path": "/index/pages/h5/h5?lch=cps:waimai:5:65c5f4b9271221c79eae104d969a48a3:16571jutuikewx:4:85459&weburl=https%3A%2F%2Fdpurl.cn%2F8uSmgBfz&f_userId=1&f_token=1",
        "name": "商超生鲜红包天天领",
      },
      {
        "appId": "wxde8ac0a21135c07d",
        "path": "/index/pages/h5/h5?lch=mhqIykekFEV63u81zLSTaQViQ&noshare=1&f_userId=0&f_openId=0&f_token=0&weburl=https%3A%2F%2Fdpurl.cn%2FVNQ7J86z",
        "name": "美团吃喝玩乐到店消费",
        //这里改成你的链接
      },
      {
        "appId": "wxde8ac0a21135c07d",
        //这里改成你的链接
        "path": "/index/pages/h5/h5?lch=mhqIykekFEV63u81zLSTaQViQ&noshare=1&f_userId=0&f_openId=0&f_token=0&weburl=https%3A%2F%2Fdpurl.cn%2FvIHQu8wz",
        "name": "美团周末特价：吃喝玩乐、低至1元",
      },
      {
        //饿了么
        "appId": "wxece3a9a4c82f58c9",
        //这里改成你的链接
        "path": "commercialize/pages/compose-guide/index?scene=2588226fdbe541bcb442c997409bfe2b",
        "name": "下单后得红包，无门槛叠加用",
      },
      {
        "appId": "wxece3a9a4c82f58c9",
        //这里改成你的链接
        "path": "taoke/pages/shopping-guide/index?scene=2wLDGYu",
        "name": "饿了么外卖红包天天领",
      },
      {
        "appId": "wxece3a9a4c82f58c9",
        //这里改成你的链接
        "path": "pages/sharePid/web/index?scene=https://s.click.ele.me/ymfDGYu",
        "name": "生鲜日用最快30分钟内达，天天领红包",
      },      
      {
        //滴滴打车  
        "appId": "wxaf35009675aa0b2a",
        "path": "/pages/index/index?scene=mDg79Kq&source_id=16571jutuikewx",
        "name": "用户可领取8折打车券，单笔交易最高抵扣10元，不同时间段优惠券金额可能会有调整，具体以实际领取为准",
        //这里改成你的链接
      },
      //美团吃喝玩乐
      {
        //高德打车
        "appId": "wxbc0cf9b963bd3550",
        //这里改成你的链接
        "path": "shareActivity/basic_activity/page/BasicActivityPop/BasicActivityPop?page_id=4k1Khw5X8wy&gd_from=outside_coupon_&pid=mm_1368340106_1991850209_111338350326&relationId=2785552080",
        "name": "高德打车领取100元组合优惠券，新用户首单可立减 10 元",
      },
      {
        //肯德基
        "appId": "wx89752980e795bfde",
        //这里改成你的链接
        "path": "/pages/index/index?pub_id=16571&sid=wx&act_id=16&source=jutuike",
        "name": "肯德基点餐最低5折，全国连锁支持食堂/外带/送餐到家",
      },
      {
        //麦当劳
        "appId": "wx89752980e795bfde",
        //这里改成你的链接
        "path": "/pages/index/index?pub_id=16571&sid=wx&act_id=26&source=jutuike",
        "name": "麦当劳在线点餐点餐最低5折",
      },
      {
        //必胜客
        "appId": "wx89752980e795bfde",
        //这里改成你的链接
        "path": "/pages/index/index?pub_id=16571&sid=wx&act_id=64&source=jutuike",
        "name": "必胜客在线点餐点餐最低7折",
      },
      {
        //汉堡王在线点餐
        "appId": "wx89752980e795bfde",
        //这里改成你的链接
        "path": "/pages/index/index?pub_id=16571&sid=wx&act_id=46&source=jutuike",
        "name": "汉堡王在线点餐，全场8.8折起",
      },
      {
        //百果园水果外送
        "appId": "wx89752980e795bfde",
        //这里改成你的链接
        "path": "/pages/index/index?pub_id=16571&sid=wx&act_id=31&source=jutuike",
        "name": "百果园水果外送，满49元包邮，全场优惠9折起",
      },
      {
        //奈雪的茶在线点餐
        "appId": "wx89752980e795bfde",
        //这里改成你的链接
        "path": "/pages/index/index?pub_id=16571&sid=wx&act_id=32&source=jutuike",
        "name": "奈雪的茶在线点餐，全场优惠8.8折起",
      }
    ]
  },
      /**
  *  图片预览方法
  *  此处注意的一点就是，调用 "wx.previewImage"时，第二个参数要求为数组形式哦
  *  当然，做过图片上传功能的应该会注意到，如果涉及到多张图片预览，图片链接数组集合即为参数 urls！
  */ 
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  onShareAppMessage(res) {
    var messages = [{
      title: '美团饿了么大额红包，每日可领！',
      path: '/pages/index/index'
    }, {
      title: '吃了这么多年外卖，你知道这个秘密吗？',
      path: '/pages/index/index'
    }, {
      title: '这样点外卖，一年省下好多钱',
      path: '/pages/index/index'
    }, {
      title: '点外卖前先领券，吃霸王餐',
      path: '/pages/index/index'
    }, {
      title: '美团饿了么内部优惠券，手慢无',
      path: '/pages/index/index'
    }, {
      title: '点外卖不用优惠券，你就out了',
      path: '/pages/index/index'
    }, {
      title: '外卖不为人知的秘密，点这解密',
      path: '/pages/index/index'
    }, {
      title: '震惊！小伙点外卖竟然花了1分钱',
      path: '/pages/index/index'
    }, {
      title: '从这点外卖，你也可以吃霸王餐',
      path: '/pages/index/index'
    }];
    let data = messages[Math.floor(Math.random() * messages.length)]
    data.imageUrl = "/cp/mf.png"
    return data;
  },

  onShareTimeline: function (res) {
    var messages = [{
      title: '美团饿了么大额红包，每日可领！',
      path: '/pages/index/index'
    }, {
      title: '吃了这么多年外卖，你知道这个秘密吗？',
      path: '/pages/index/index'
    }, {
      title: '这样点外卖，一年省下好多钱',
      path: '/pages/index/index'
    }, {
      title: '点外卖前先领券，吃霸王餐',
      path: '/pages/index/index'
    }, {
      title: '美团饿了么内部优惠券，手慢无',
      path: '/pages/index/index'
    }, {
      title: '点外卖不用优惠券，你就out了',
      path: '/pages/index/index'
    }, {
      title: '外卖不为人知的秘密，点这解密',
      path: '/pages/index/index'
    }, {
      title: '震惊！小伙点外卖竟然花了1分钱',
      path: '/pages/index/index'
    }, {
      title: '从这点外卖，你也可以吃霸王餐',
      path: '/pages/index/index'
    }];
    let data = messages[Math.floor(Math.random() * messages.length)]
    data.imageUrl = "/cp/mf.png"
    return data;
  },


  touchStart: function (e) {
    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y
    ctx.save();  //保存当前坐标轴的缩放、旋转、平移信息
    ctx.beginPath() //开始一个路径 
    ctx.clearRect(startX1, startY1, 10, 10);
    ctx.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
    })
  },
  morexh() {
    let i = getNum(0, this.data.xs.length - 1)
    this.setData({
      xsI: i,
    })
  },
  onLoad() {
    wx.setStorageSync('key', '5321')
    let that = this
    let i = 0
    setInterval(() => {
      i++
      if (i % 4 == 0) {
        this.setData({
          animated2: 'swing',
          animated1: ''
        })
      }
      else if (i % 4 == 2) {
        this.setData({
          animated2: '',
          animated1: 'swing'
        })
      }
      else {
        this.setData({
          animated2: '',
          animated1: ''
        })
      }
    }, 1200)

    this.setData({
      xsI: getNum(0, this.data.xs.length - 1, this)
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.platform)
        console.log(res.statusBarHeight)
        let nav_top = res.statusBarHeight + 4
        if (res.platform.toLowerCase() == 'android') {
          nav_top += 4
        }

        this.setData({
          global_top: nav_top + 20 + 'px',
        })
      },
    })

    this.activityData()
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  ReachBottom() {
    console.log("rrrrrrrrrrrr")
    if(this.data.totallPages && this.data.pageNum < this.data.totallPages){
      this.data.pageNum += 1
      this.activityData() // 调用列表接口
    }else if(this.data.totallPages){
      wx.showToast({
        title: "没有更多了",
        icon: "none"
      })
    }
  },
  onRandom() {
    if (timer) {
      clearInterval(timer)
      timer = null
      this.setData({
        processing: false
      })
      return
    } else {
      timer = setInterval(() => {
        this.setData({
          current: this.data.list[getNum(0, this.data.list.length - 1)]
        })
      }, 100)
      this.setData({
        processing: true,
        isFirst: false
      })
    }
  },


  
  activityData(){
    var that = this;
        // 活动接口调用示例
        activitylist({
          apikey:"QwFMS5eLS29Dikp6kAi6zhwEouTh5xUY",
          page:`${that.data.pageNum}`,
          pageSize:10
        }).then((activitylist)=>{
          console.log(activitylist,"oooooooooooooooooooo");
          that.setData({
            activitylist:[...that.data.activitylist,...activitylist.data.data],
            totallPages:activitylist.data.last_page
          })
        }).catch((error) => {
          console.log("tttttttttttttttttttttttttttttt")
          // console.error(error);
        })
  },
  hulian(){
    wx.navigateToMiniProgram(
      {
        appId: "wx87df02655e5ac0a2",
        path: "/pages/index/index",
      }
    )
  },
  goact0() {
    this.setData({ act: 0 })
  },
  goact1() {
    this.setData({ act: 1 })
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
  showPopup() {
    this.setData({ isshow: true });
  },

  onClose() {
    this.setData({ isshow: false });
  },
  shengquan(e){
    var that =this;
    console.log(e.currentTarget.dataset.item);
    let act_id = e.currentTarget.dataset.item;
    activitydetails({
      apikey:"QwFMS5eLS29Dikp6kAi6zhwEouTh5xUY",
      sid:act_id,
      act_id,
      channels:1
    }).then((activitydetails)=>{

      if(activitydetails.data.we_app_info != "" || activitydetails.data.we_app_info !=undefined){
        wx.navigateToMiniProgram({
          appId: activitydetails.data.we_app_info.app_id,
          path: activitydetails.data.we_app_info.page_path,
        })
      }
      that.setData({
        activitydetails:activitydetails.data.we_app_info
      })
    }).catch((error) => {
      console.log("tttttttttttttttttttttttttttttt")
      // console.error(error);
    })
  },
  // wm1() {

  //   wx.navigateToMiniProgram(
  //     this.data.miniData[0]
  //   )
  // },
  // wm2() {
  //     wx.navigateToMiniProgram(
  //       this.data.miniData[1]
  //     )

  // },
  // wm3() {
  //     wx.navigateToMiniProgram(
  //       this.data.miniData[2]
  //     )

  // },
  // wm4() {
  //     wx.navigateToMiniProgram(
  //       this.data.miniData[3]
  //     )

  // },
  // wm5() {
  //     wx.navigateToMiniProgram(
  //       this.data.miniData[4]
  //     )

  // },
  goxr() {
    wx.navigateTo({
      url: '/pages/makee/makee'
    })
  },
  wm6() {
      wx.navigateToMiniProgram(
        this.data.miniData[5]
      )

  },
  wm7() {
    wx.navigateToMiniProgram(
      this.data.miniData[6]
    )

},
wm8() {
  wx.navigateToMiniProgram(
    this.data.miniData[7]
  )

},
wm9() {
  wx.navigateToMiniProgram(
    this.data.miniData[8]
  )

},
handleContact(e){
  console.log(e.detail.path)
  console.log(e.detail.query)
}
})
