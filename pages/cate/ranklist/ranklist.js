var t = getApp(), s = require("../../../require.js");

Page({
    data: {
        rank_cate: [],
        recipe_list: [],
        cate_id: {},
        attention_status: {},
        request_status: !0
    },
    conf: {
        lock: !1,
        rank_id: 0,
        attention_status: {}
    },
    onLoad: function(t) {
        this.getList();
    },
    getList: function() {
        this.conf.lock || (this.conf.lock = !0, s.get("Content/Rank/getList", {
            rank_id: this.conf.rank_id
        }, this.getListSuccess.bind(this), this.getListFail.bind(this)));
    },
    onShow: function() {
        s.loginChange(function(t) {
            wx.showToast({
                title: "登录成功",
                icon: "success",
                duration: 1500
            });
        });
    },
    getListSuccess: function(t) {
        200 == t.Status && t.Result.RecipeList || (this.setData({
            request_status: !1
        }), this.conf.lock = !1);
        var s = this.data.rank_cate;
        t.Result.RankCate.List.length > 0 && (s = t.Result.RankCate);
        var i = 0 == this.conf.rank_id ? 1 : this.conf.rank_id, e = {};
        if (t.Result.RecipeList.List.length > 0) for (var n = 0; n < t.Result.RecipeList.List.length; n++) e[t.Result.RecipeList.List[n].RecipeId] = t.Result.RecipeList.List[n].IsAttention;
        this.setData({
            rank_cate: s,
            cate_id: i,
            attention_status: e,
            recipe_list: t.Result.RecipeList
        }), this.conf.attention_status = e, this.conf.lock = !1;
    },
    getListFail: function(t) {
        this.setData({
            request_status: !1
        }), this.conf.lock = !0;
    },
    cateBut: function(t) {
        var s = t.currentTarget.dataset.id;
        this.conf.cate_id != s && (this.setData({
            cate_id: s
        }), this.conf.rank_id = s, this.getList());
    },
    attentionBut: function(t) {
        var i = this, e = t.currentTarget.dataset.id, n = this.conf.attention_status, a = this.data.attention_status;
        n[e] ? s.post("Content/Recipe/unfollow", {
            rid: e
        }, function(t) {
            551 != t.Status && 552 != t.Status || i.jumpLogin(), a[e] = !1, 200 == t.Status && (i.setData({
                attention_status: a
            }), i.conf.attention_status[e] = !1);
        }) : s.post("Content/Recipe/follow", {
            rid: e
        }, function(t) {
            551 != t.Status && 552 != t.Status || i.jumpLogin(), a[e] = !0, 200 == t.Status && (i.setData({
                attention_status: a
            }), i.conf.attention_status[e] = !0, wx.showToast({
                title: "操作成功",
                icon: "success",
                duration: 1500
            }));
        });
    },
    jumpLogin: function() {
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: "排行榜",
            path: "/pages/cate/ranklist/ranklist"
        };
    }
});