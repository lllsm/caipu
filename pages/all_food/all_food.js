var t = getApp(), i = require("../../require.js");

Page({
    data: {
        list: [],
        hide_but_id: "",
        but_id_all: {},
        request_status: !0
    },
    conf: {
        but_id_all: {}
    },
    onLoad: function(t) {
        this.getList();
    },
    getList: function() {
        i.get("Home/Index/getFoodData", {}, this.getListSuccess.bind(this), this.getListFail.bind(this));
    },
    getListSuccess: function(t) {
        200 == t.Status && t.Result.List || this.setData({
            request_status: !1
        });
        for (var i = {}, s = 0; s < t.Result.List.length; s++) for (var a = t.Result.List[s], e = 0; e < a.List.length; e++) a.List[e].Items.Hide && (i[a.List[e].ButKey] = !1);
        this.setData({
            list: t.Result.List,
            but_id_all: i
        }), this.conf.but_id_all = i;
    },
    getListFail: function(t) {
        this.setData({
            request_status: !1
        });
    },
    unfoldData: function(t) {
        var i = parseInt(t.currentTarget.dataset.butId);
        if (!this.conf.but_id_all.but_id) {
            var s = this.data.but_id_all;
            s[i] = !0, this.setData({
                but_id_all: s
            }), this.conf.but_id_all[i] = !0;
        }
    },
    foldData: function(t) {
        var i = t.currentTarget.dataset.butId;
        if (!this.conf.but_id_all.but_id) {
            var s = this.data.but_id_all;
            s[i] = !1, this.setData({
                hide_but_id: i,
                but_id_all: s
            }), this.conf.but_id_all[i] = !1;
        }
    },
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: "食材大全",
            path: "/pages/all_food/all_food"
        };
    }
});