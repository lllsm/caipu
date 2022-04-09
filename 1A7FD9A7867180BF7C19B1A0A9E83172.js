function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), n = getApp(), o = require("9CE874B1867180BFFA8E1CB67DD83172.js"), a = new (function() {
    function u() {
        t(this, u), this.authName = "auth", this.autoToast = !0;
    }
    return e(u, [ {
        key: "getStorage",
        value: function(t) {
            var e = "";
            try {
                e = wx.getStorageSync(t);
            } catch (t) {}
            return e;
        }
    }, {
        key: "setStorage",
        value: function(t, e) {
            try {
                wx.setStorageSync(t, e);
            } catch (t) {
                return !1;
            }
            return !0;
        }
    }, {
        key: "getAuth",
        value: function() {
            return this.getStorage(this.authName);
        }
    }, {
        key: "setAuth",
        value: function(t) {
            return this.setStorage(this.authName, t);
        }
    }, {
        key: "apiRequest",
        value: function(t, e, a, u, i) {
            var s = this, r = n.conf, c = r.apiurl + t, h = {
                "content-type": "POST" === e ? "application/x-www-form-urlencoded" : "application/json",
                "X-UA": r.ua,
                AUTH: this.getAuth()
            }, l = Date.parse(new Date()) / 1e3, f = o.hexMD5(r.key + r.ver + t + r.appid + r.siteid + l), g = "dev" == r.env && r.debug;
            return c += "?appid=" + r.appid + "&siteid=" + r.siteid + "&time=" + l + "&hash=" + f, 
            g && console.info("API请求: " + c), wx.request({
                url: c,
                method: e,
                data: a,
                dataType: "json",
                header: h,
                success: function(e) {
                    var n = {
                        Status: 503,
                        Result: {
                            ErrorMsg: "服务器忙, 请稍后重试"
                        }
                    };
                    e && e.data && e.data.Status && (n = e.data), g && (console.info(t + " API返回数据: "), 
                    console.info(n)), s.autoToast && 200 != n.Status && n.Result && n.Result.ErrorMsg && 551 != n.Status && 552 != n.Status && wx.showToast({
                        title: n.Result.ErrorMsg,
                        icon: "none",
                        duration: 1500
                    }), s.autoToast = !0, 551 != n.Status && 552 != n.Status || s.setAuth(""), u && u(n);
                },
                fail: function() {
                    s.autoToast = !0, i && i();
                }
            });
        }
    }, {
        key: "get",
        value: function(t, e, n, o) {
            return this.apiRequest(t, "GET", e, n, o);
        }
    }, {
        key: "post",
        value: function(t, e, n, o) {
            return this.apiRequest(t, "POST", e, n, o);
        }
    }, {
        key: "setAutoToast",
        value: function(t) {
            this.autoToast = !!t;
        }
    }, {
        key: "isLogin",
        value: function() {
            return !!this.getAuth();
        }
    }, {
        key: "logout",
        value: function() {
            return this.setAuth("");
        }
    }, {
        key: "loginChange",
        value: function(t, e) {
            var n = a.isLogin();
            this.conf && void 0 !== this.conf._login || (this.conf = {}, this.conf._login = n), 
            this.conf._login != n && (n ? t && t() : e && e()), this.conf._login = n;
        }
    }, {
        key: "connectLogin",
        value: function(t, e, n, o) {
            var a = this;
            wx.showLoading({
                title: "登录中...",
                mask: !0
            }), this.post("User/Account/ConnectReg", {
                site_id: 6,
                code: n,
                data: o.encryptedData,
                iv: o.iv
            }, function(n) {
                wx.hideLoading(), n.Result.Auth ? (a.setAuth(n.Result.Auth), t && t(n.Result)) : e && e();
            }, function() {
                wx.hideLoading(), e && e();
            });
        }
    } ]), u;
}())();

module.exports = a;