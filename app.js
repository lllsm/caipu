App({
    data: {},
    conf: {
        env: "pro",
        debug: !1,
        ver: "v2.0.5",
        siteid: 101,
        key: "aeab3c74776f0f44211a73eec5ac340d",
        systeminfo: {},
        ua: "",
        appid: 1,
        apiurl: "https://api.jxcaipu.com/miniapp/v2.0.4/",
        shareinfo: {
            title: "荷包蛋菜谱",
            content: "精心挑选每一道美食菜谱，是下厨房必备家常菜谱大全。",
            picurl: "https://img0.jxcaipu.com/mobile/public/images/logo_256.png?v=1"
        },
        videomode: !0
    },
    onLaunch: function(i) {
        var t = "api.jxcaipu.com/miniapp/";
        "dev" === this.conf.env ? this.conf.apiurl = "http://test." + t + this.conf.ver + "/" : this.conf.apiurl = "https://" + t + this.conf.ver + "/", 
        this.conf.systeminfo = wx.getSystemInfoSync(), this.conf.ua = [ this.conf.systeminfo.model, this.conf.systeminfo.system, this.conf.systeminfo.version ].join(","), 
        "ios" == this.conf.systeminfo.platform && (this.conf.appid = 3);
    },
    getDefaultPageInfo: function(i, t) {
        return {
            title: i || "荷包蛋菜谱,每一道菜都是精细之选,做最好的美食分享网站,提供优质的家常菜谱大全",
            keywords: "美食,菜谱,烹饪,食谱,家常菜谱,美食网站",
            description: "荷包蛋菜谱为您提供最全、最优质的中文菜谱做法,丰富的菜谱大全让您轻松地学会怎么做美食，展现自己的高超厨艺，与千万会员一同分享美味的人生",
            image: t || this.conf.shareinfo.picurl
        };
    },
    getDefaultShareInfo: function() {
        return {
            title: this.conf.shareinfo.title,
            content: this.conf.shareinfo.content,
            imageUrl: this.conf.shareinfo.picurl,
            path: "/pages/index/index"
        };
    }
});