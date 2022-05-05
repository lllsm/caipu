var t = getApp(), e = require("../../require.js");

Page({
    data: {
        nick_name: "",
        user_avatar: "",
        intro: "",
        user_id: "",
        list_height: 676,
        recipe_list: {
            myFavorite: [],
            myRecipe: []
        },
        pages_but: "myFavorite",
        pages: [ {
            Id: "myFavorite",
            Name: "收藏的"
        }, {
            Id: "myRecipe",
            Name: "发布的"
        } ],
        request_status: !0,
        login_status: !0
    },
    conf: {
        lock: !1,
        pages_but: "myFavorite",
        offset_all: {
            myFavorite: 0,
            myRecipe: 0
        },
        login_status: !0,
        first_load: !0
    },
    onLoad: function(i) {
        var s = e.isLogin(), a = t.conf.systeminfo;
        this.conf.height = a.screenHeight;
        var o = 676;
        812 == a.screenHeight && (o = 966), this.setData({
            list_height: o,
            login_status: s
        }), this.conf.login_status = s, s && this.getUserInfo();
    },
    onShow: function() {
        var i = this;
        e.loginChange(function(t) {
            wx.showToast({
                title: "登录成功",
                icon: "success",
                duration: 1500
            }), i.getUserInfo(), i.setData({
                login_status: !0
            }), i.conf.login_status = !0;
        });
        var s = e.isLogin();
        if (s) {
            var a = t.conf.systeminfo;
            this.conf.height = a.screenHeight;
            var o = 706;
            812 == a.screenHeight && (o = 996), this.getUserInfo(), this.setData({
                list_height: o,
                login_status: s
            }), this.conf.login_status = s;
        } else this.dataClear();
        t.getDefaultPageInfo();
    },
    getUserInfo: function() {
        this.conf.lock || (this.conf.lock = !0, e.get("Center/User/getUserIndex", {}, this.getDataSuccess.bind(this), this.getDataFail.bind(this)));
    },
    getDataSuccess: function(e) {
        if (551 == e.Status || 552 == e.Status) return this.dataClear(), this.conf.lock = !1, 
        !1;
        200 == e.Status && e.Result.UserId || (this.setData({
            request_status: !1
        }), this.conf.lock = !1);
        var i = {
            myFavorite: this.data.recipe_list.myFavorite,
            myRecipe: this.data.recipe_list.myRecipe
        };
        if (e.Result.MyFavorite.List.length > 0) {
            var s = e.Result.MyFavorite.List;
            t.videomode || (s = this.videoTypeConvert(s)), "myFavorite" == this.conf.pages_but && (i.myFavorite = [], 
            i.myFavorite = i.myFavorite.concat(s), this.conf.offset_all.myFavorite += 10);
        }
        this.setData({
            nick_name: e.Result.NickName,
            user_avatar: e.Result.UserAvatar,
            intro: e.Result.Intro,
            user_id: e.Result.UserId,
            recipe_list: i
        }), this.conf.lock = !1;
    },
    getDataFail: function(t) {
        this.setData({
            request_status: !1
        }), this.conf.lock = !1;
    },
    pageData: function(t) {
        var i = t.currentTarget.id;
        i != this.data.sort_id && (this.setData({
            pages_but: i
        }), this.conf.pages_but = i, wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), e.isLogin() && this.getList());
    },
    getList: function() {
        if (!this.conf.lock) if (this.conf.lock = !0, "myFavorite" == this.conf.pages_but) {
            var t = this.conf.offset_all.myFavorite;
            e.get("Center/User/myFavorite", {
                offset: t
            }, this.getListUsccess.bind(this));
        } else {
            var i = this.conf.offset_all.myRecipe;
            e.get("Center/User/myRecipe", {
                offset: i
            }, this.getListUsccess.bind(this));
        }
    },
    getListData: function() {
        this.getList();
    },
    getListUsccess: function(e) {
        if (551 == e.Status || 552 == e.Status) return wx.showToast({
            title: "请重新登录",
            icon: "none",
            duration: 1500
        }), this.dataClear(), this.conf.lock = !1, !1;
        if (200 == e.Status && e.Result.List) {
            var i = e.Result.List;
            t.videomode || (i = this.videoTypeConvert(e.Result.List));
            var s = {
                myFavorite: this.data.recipe_list.myFavorite,
                myRecipe: this.data.recipe_list.myRecipe
            };
            e.Result.List.length > 0 && ("myFavorite" == this.conf.pages_but && (s.myFavorite = s.myFavorite.concat(i), 
            this.conf.offset_all.myFavorite += 10), "myRecipe" == this.conf.pages_but && (s.myRecipe = s.myRecipe.concat(i), 
            this.conf.offset_all.myRecipe += 10)), this.setData({
                recipe_list: s
            });
        }
        this.conf.lock = !1;
    },
    videoTypeConvert: function(t) {
        for (var e = t.length, i = 0; i < e; i++) t[i].Type = 0;
        return t;
    },
    loginBut: function() {
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    quitLogin: function() {
        this.dataClear(), wx.showToast({
            title: "已退出登录",
            icon: "success",
            duration: 1500
        }), wx.switchTab({
            url: "/pages/user/user"
        });
    },
    dataClear: function() {
        e.setAuth(""), this.setData({
            nick_name: "",
            user_avatar: "",
            intro: "",
            user_id: "",
            list_height: 676,
            recipe_list: {
                myFavorite: [],
                myRecipe: []
            },
            pages_but: "myFavorite",
            login_status: !1
        }), this.conf.pages_but = "myFavorite", this.conf.offset = {
            myFavorite: 0,
            myRecipe: 0
        };
    },
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: this.conf.share_title,
            path: "/pages/index/index"
        };
    }
});