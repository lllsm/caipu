var t = getApp(), e = require("../../../require.js"), a = require("../../../9CE874B1867180BFFA8E1CB67DD83172.js");

Page({
    data: {
        user_avatar: "",
        user_name: "",
        user_id: "",
        save_but_type: !0,
        request_status: !0,
        version: ""
    },
    conf: {
        lock: !1,
        user_avatar: "",
        name: "",
        name_input: ""
    },
    onLoad: function(e) {
        var a = t.conf.ver;
        this.setData({
            version: a
        }), this.getUserInfo();
    },
    onShow: function() {
        var a = this;
        e.loginChange(function(t) {
            a.getUserInfo();
        }, function(t) {
            wx.navigateTo({
                url: "/pages/login/login"
            });
        });
        t.getDefaultPageInfo();
    },
    getUserInfo: function() {
        e.get("User/Account/getUserInfo", {}, this.getDataSuccess.bind(this), this.getDataFail.bind(this));
    },
    getDataSuccess: function(t) {
        if (551 == t.Status || 552 == t.Status) return wx.switchTab({
            url: "/pages/user/user"
        }), wx.showToast({
            title: "请重新登录",
            icon: "none",
            duration: 1500
        }), !1;
        200 == t.Status && t.Result.UserId && this.setData({
            user_avatar: t.Result.UserAvatar,
            user_name: t.Result.NickName,
            user_id: t.Result.UserId
        }), this.conf.name = t.Result.NickName;
    },
    getDataFail: function(t) {
        this.setData({
            request_status: !1
        });
    },
    updateAvatar: function() {
        var s = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(n) {
                wx.showLoading({
                    title: "头像上传中..."
                });
                var i = n.tempFilePaths[0];
                s.conf.user_avatar = i;
                var r = {
                    "X-UA": t.conf.ua,
                    AUTH: e.getAuth()
                }, o = "Center/User/modifyUser", u = Date.parse(new Date()) / 1e3, c = a.hexMD5(t.conf.key + t.conf.ver + o + t.conf.appid + t.conf.siteid + u), f = t.conf.apiurl + o + "?appid=" + t.conf.appid + "&siteid=" + t.conf.siteid + "&time=" + u + "&hash=" + c;
                wx.uploadFile({
                    url: f,
                    filePath: i,
                    header: r,
                    name: "avatar",
                    success: function(t) {
                        if (t.data) {
                            var e = JSON.parse(t.data);
                            200 == e.Status && e.Result.UserAvatar ? (wx.showToast({
                                title: "头像上传成功",
                                icon: "success",
                                duration: 1500
                            }), s.setData({
                                user_avatar: e.Result.UserAvatar
                            })) : s.updateAvatarError();
                        } else s.updateAvatarError();
                    },
                    fail: function(t) {
                        s.updateAvatarError();
                    }
                });
            }
        });
    },
    updateAvatarError: function() {
        wx.showToast({
            title: "头像上传失败,请稍后重试",
            icon: "none",
            duration: 1500
        });
    },
    nameInput: function(t) {
        var e = t.detail.value;
        "" != e ? (this.conf.name_input = e, this.setData({
            save_but_type: !1
        })) : (this.conf.name_input = e, this.setData({
            save_but_type: !0
        }));
    },
    saveData: function(t) {
        var a = this;
        "" != this.conf.name_input && this.conf.name_input != this.conf.name ? this.conf.lock || (this.conf.lock = !0, 
        e.post("Center/User/modifyUser", {
            name: this.conf.name_input
        }, function(t) {
            200 == t.Status && t.Result.UserName && (a.setData({
                user_name: t.Result.UserName
            }), wx.showToast({
                title: "昵称修改成功",
                icon: "success",
                duration: 1500
            }), a.conf.name = t.Result.UserName, a.conf.lock = !1);
        })) : wx.showToast({
            title: "昵称修改成功",
            icon: "success",
            duration: 1500
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