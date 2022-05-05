var t = getApp(), e = require("../../require.js");

Page({
    data: {
        title: "",
        aname: "",
        cover: "",
        description: [],
        recommend_list: [],
        request_status: !0
    },
    conf: {
        food_id: "",
        food_title: "",
        food_cover: "",
        share_title: t.conf.shareinfo.title,
        share_desc: t.conf.shareinfo.content,
        share_img: t.conf.shareinfo.picurl
    },
    onLoad: function(t) {
        var e = t.food_id;
        this.conf.food_id = e, this.getList();
    },
    getList: function() {
        e.get("Content/Food/getDetail", {
            food_id: this.conf.food_id
        }, this.getListSuccess.bind(this), this.getListFail.bind(this));
    },
    getListSuccess: function(e) {
        if (200 != e.Status || !e.Result.Details) return this.setData({
            request_status: !1
        }), !1;
        e.Result.RecommendList && !t.videomode && (e.Result.RecommendList = this.videoTypeConvert(e.Result.RecommendList)), 
        this.setData({
            title: e.Result.Details.Name,
            aname: e.Result.Details.Aname,
            cover: e.Result.Details.Cover,
            description: e.Result.Details.Description,
            recommend_list: e.Result.RecommendList
        });
        var s = {
            food_title: e.Result.Details.Name,
            food_cover: e.Result.Details.Cover,
            share_title: e.Result.Details.Name,
            share_desc: e.Result.Details.Aname,
            share_img: e.Result.Details.Cover
        };
        this.conf = Object.assign(this.conf, s);
    },
    videoTypeConvert: function(t) {
        for (var e = t.length, s = 0; s < e; s++) t[s].Type = 100;
        return t;
    },
    getListFail: function(t) {
        this.setData({
            request_status: !1
        });
    },
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: this.conf.share_title,
            path: "/pages/food/food?food_id=" + this.conf.food_id
        };
    }
});