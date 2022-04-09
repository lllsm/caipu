var t = getApp(), e = require("../../1A7FD9A7867180BF7C19B1A0A9E83172.js");

Page({
    data: {
        banner_list: [],
        scroll_title: "",
        scroll_id: "",
        rank_list: [],
        rank_count: 6,
        video_list: [],
        video_count: 0,
        recipe_list: [],
        search_type: !1,
        placeholder_type: "search-pla",
        request_status: !0,
        cate: [ {
            Id: "4a1ee87",
            Name: "家常菜"
        }, {
            Id: "4a3die4",
            Name: "下饭菜"
        }, {
            Id: "4a7c729",
            Name: "快手菜"
        }, {
            Id: "54ahadf",
            Name: "早餐"
        }, {
            Id: "455egff",
            Name: "鸡蛋"
        }, {
            Id: "6icidef",
            Name: "烘培"
        }, {
            Id: "5a625b5",
            Name: "汤羹"
        }, {
            Id: "c7f2545",
            Name: "孕妇"
        }, {
            Id: "4b91e0a",
            Name: "主食"
        }, {
            Id: "more",
            Name: "更多"
        } ]
    },
    conf: {
        lock: !1,
        banner_title: [],
        banner_id: [],
        search_content: "",
        offset: 0
    },
    onLoad: function() {
        this.getlist(0);
    },
    onReachBottom: function() {
        this.getlist(this.conf.offset);
    },
    getlist: function(t) {
        this.conf.lock || (this.conf.lock = !0, e.get("Home/Index/getHomeData", {
            offset: t
        }, this.requestSuccess.bind(this), this.requesFail.bind(this)));
    },
    requestSuccess: function(e) {
        if (200 != e.Status || !e.Result.RecipeList) return this.setData({
            request_status: !1
        }), !1;
        t.videomode = e.Result.VideoMode;
        var s = {
            banner_list: this.data.banner_list,
            scroll_title: this.data.scroll_title,
            scroll_id: this.data.scroll_id,
            rank_list: this.data.rank_list,
            rank_count: this.data.rack_count,
            video_list: this.data.video_list,
            video_count: this.data.video_count,
            recipe_list: this.data.recipe_list
        };
        if (e.Result.Banner && e.Result.Banner.List.length > 0) {
            for (var i = [], a = [], n = e.Result.Banner.List.length, l = 0; l < n; l++) i[l] = e.Result.Banner.List[l].Title, 
            a[l] = e.Result.Banner.List[l].RecipeId, t.videomode || (e.Result.Banner.List[l].Type = 0);
            this.conf.banner_title = i, this.conf.banner_id = a, s.scroll_title = i[0], s.scroll_id = a[0], 
            s.banner_list = e.Result.Banner.List;
        }
        if (e.Result.Rank && e.Result.Rank.List.length > 0) {
            s.rank_count = e.Result.Rank.Count;
            var o = e.Result.Rank.List;
            t.videomode || (o = this.videoTypeConvert(e.Result.Rank.List)), s.rank_list = o;
        }
        if (e.Result.Video && e.Result.Video.List.length > 0 && (s.video_count = e.Result.Video.Count, 
        t.videomode || (e.Result.Video.List = ""), s.video_list = e.Result.Video.List), 
        e.Result.RecipeList && e.Result.RecipeList.List.length > 0) {
            e.Result.RecipeList.List;
            t.videomode || this.videoTypeConvert(e.Result.RecipeList.List);
            var c = this.data.recipe_list.concat(e.Result.RecipeList.List);
            s.recipe_list = c, this.conf.offset += 10;
        }
        this.setData(s), this.conf.lock = !1;
    },
    requesFail: function(t) {
        this.setData({
            search_type: !0,
            placeholder_type: "search-pla-select"
        });
    },
    videoTypeConvert: function(t) {
        for (var e = t.length, s = 0; s < e; s++) t[s].Type = 0;
        return t;
    },
    moreList: function() {
        wx.switchTab({
            url: "/pages/all_cate/all_cate"
        });
    },
    search: function(t) {
        this.setData({
            search_type: !0,
            placeholder_type: "search-pla-select"
        });
    },
    search_blur: function(t) {
        "" == this.conf.search_content && this.setData({
            search_type: !1,
            placeholder_type: "search-pla"
        });
    },
    search_monitor: function(t) {
        var e = t.detail.value;
        this.conf.search_content = e;
    },
    search_data: function(t) {
        "" != this.conf.search_content && wx.navigateTo({
            url: "/pages/cate/cate?cate_id=&keywords=" + this.conf.search_content
        });
    },
    scrollBanner: function(t) {
        var e = t.detail.current;
        this.setData({
            scroll_title: this.conf.banner_title[e],
            scroll_id: this.conf.banner_id[e]
        });
    },
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: this.conf.share_title,
            path: "/pages/index/index"
        };
    }
});