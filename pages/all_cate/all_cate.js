var t = getApp(), e = require("../../require.js");

Page({
    data: {
        list: [],
        search_type: !1,
        placeholder_type: "search-pla",
        scroll_id: "",
        cate_id: "",
        height_ipx: 980,
        model_status: !1,
        request_status: !0
    },
    conf: {
        search_content: ""
    },
    onLoad: function() {
        var e = t.conf.systeminfo, s = e.windowHeight, a = e.model;
        e.screenHeight;
        this.conf.height = e.screenHeight;
        var i = 980;
        i = 2 * (s - 50);
        var c = !1;
        -1 == a.search("iPhone") && (c = !0), this.setData({
            height_ipx: i,
            model_status: c
        }), this.getList();
    },
    getList: function() {
        e.get("Home/Index/getCategory", {}, this.getListSuccess.bind(this), this.getListFail.bind(this));
    },
    getListSuccess: function(t) {
        if (200 == t.Status && t.Result.List) {
            for (var e = 0; e < t.Result.List.length; e++) t.Result.List[e].id = "in_" + e;
            var s = t.Result.List[0].id;
            this.setData({
                list: t.Result.List,
                cate_id: s,
                cate_count: t.Result.Count
            });
        }
    },
    getListFail: function(t) {
        this.setData({
            request_status: !1
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
    cateName: function(t) {
        var e = t.currentTarget.id;
        e != this.data.scroll_id && this.setData({
            scroll_id: e,
            cate_id: e
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
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: "菜谱大全",
            path: "/pages/all_cate/all_cate"
        };
    }
});