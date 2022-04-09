
let timer = null
import { getNum } from '../../utils/util'

let urlPromise = null

Page({

  data: {
    animated2: '',
    animated1: '',
    xsI: 1,
    xsaa: 1,
    img: '../../imgs/sl.png',
    global_top: '28px',
    current: "",
    isFirst: true,
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
    miniData: [
      //饿了么1
      {
        "appId": "wxece3a9a4c82f58c9",
        
        "path": "commercialize/pages/compose-guide/index?scene=ef78f1eeae5a455b91f2038040328a41"
        //这里改成你的链接
      },
      //美团1
      {
        "appId": "wxde8ac0a21135c07d",
        //这里改成你的链接
        "path": "/index/pages/h5/h5?lch=cps:waimai:5:65c5f4b9271221c79eae104d969a48a3:16571jutuikewx:33:85459&weburl=https%3A%2F%2Fdpurl.cn%2F0cb5HgHz&f_userId=1&f_token=1"
      },
      //美团闪购
      {
        "appId": "wxde8ac0a21135c07d",
        "path": "/index/pages/h5/h5?lch=cps:waimai:5:65c5f4b9271221c79eae104d969a48a3:16571jutuikewx:4:85459&weburl=https%3A%2F%2Fdpurl.cn%2FVBPKCBkz&f_userId=1&f_token=1"
        //这里改成你的链接
      },
      //饿了么 好友赏金
      {
        "appId": "wxece3a9a4c82f58c9",
        //这里改成你的链接
        "path": "taoke/pages/shopping-guide/index?scene=B66GwYu"
      },
      //饿了么果蔬
      {
        "appId": "wxece3a9a4c82f58c9",
        //这里改成你的链接
        "path": "pages/sharePid/web/index?scene=https://s.click.ele.me/BShY8Zu"
      },
      //美团果蔬
      {
        "appId": "wxde8ac0a21135c07d",
        //这里改成你的链接
        "path": "/index/pages/h5/h5?f_userId=1&f_token=1&s_cps=1&weburl=https%3A%2F%2Fdpurl.cn%2FQi0jnGsz"
      },
      //美团周末
      {
        "appId": "wxde8ac0a21135c07d",
        //这里改成你的链接
        "path": "/index/pages/h5/h5?lch=mhqIykekFEV63u81zLSTaQViQ&noshare=1&f_userId=0&f_openId=0&f_token=0&weburl=https%3A%2F%2Fdpurl.cn%2FcOVJMlRz"
      },      
      {
        "appId": "wx1690e2d90c771536",
        
        "path": "pages/index/index"
        //这里改成你的链接
      },
      //美团吃喝玩乐
      {
        "appId": "wxde8ac0a21135c07d",
        //这里改成你的链接
        "path": "/index/pages/h5/h5?lch=mhqIykekFEV63u81zLSTaQViQ&noshare=1&f_userId=0&f_openId=0&f_token=0&weburl=https%3A%2F%2Fdpurl.cn%2Fa3hCJlqz"
      },
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
  goact0() {
    this.setData({ act: 0 })
  },
  goact1() {
    this.setData({ act: 1 })
  },
  wm1() {

    wx.navigateToMiniProgram(
      this.data.miniData[0]
    )
  },
  wm2() {
      wx.navigateToMiniProgram(
        this.data.miniData[1]
      )

  },
  wm3() {
      wx.navigateToMiniProgram(
        this.data.miniData[2]
      )

  },
  wm4() {
      wx.navigateToMiniProgram(
        this.data.miniData[3]
      )

  },
  wm5() {
      wx.navigateToMiniProgram(
        this.data.miniData[4]
      )

  },
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
})
