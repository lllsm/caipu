var t = getApp(), e = require("../../../1A7FD9A7867180BF7C19B1A0A9E83172.js");

Page({
    data: {
        list: [],
        list_status: !1,
        add_comment_hide: "add-comment-hide",
        request_status: !0,
        null_comment: "",
        comment_text_height: 890
    },
    conf: {
        lock: !1,
        login_status: !1,
        recipe_id: "",
        count: "",
        offset: 0,
        comment_digg_storagep: [],
        comment_height: 280,
        model: "iPhone",
        scroll_top: 0,
        scroll_direction: "down",
        but_scroll_lock: !0,
        direction_but_class: "",
        reach_bottom: !1,
        comment_content: "",
        add_comment_lock: !0
    },
    onLoad: function(n) {
        var o = t.conf.systeminfo;
        -1 == o.model.search("iPhone") && (this.conf.comment_height += 100);
        var i = 890;
        812 == o.screenHeight && (i = 955, this.setData({
            comment_text_height: i
        }));
        var s = e.isLogin();
        this.conf.recipe_id = n.id, this.conf.count = n.count, this.conf.login_status = s, 
        this.getList();
    },
    onShow: function() {
        var t = this;
        e.loginChange(function(e) {
            t.conf.login_status = !0, wx.showToast({
                title: "登录成功",
                icon: "success",
                duration: 1500
            });
        });
    },
    onReachBottom: function() {
        this.getList();
    },
    getList: function() {
        this.conf.lock || (this.conf.lock = !0, e.get("Content/Recipe/getCommentList", {
            rid: this.conf.recipe_id,
            offset: this.conf.offset
        }, this.getListSuccess.bind(this), this.getListFail.bind(this)));
    },
    getListSuccess: function(t) {
        200 == t.Status && t.Result.List || (this.setData({
            request_status: !1
        }), this.conf.lock = !1);
        var n = [];
        if (t.Result.List.length > 0) {
            var o = e.getStorage("comment");
            n = this.data.list.concat(t.Result.List);
            for (var i = 0; i < n.length; i++) o.includes(n[i].CommentId) ? n[i].DiggStatus = !0 : n[i].DiggStatus = !1;
            this.setData({
                request_status: !0,
                list_status: !0,
                null_comment: "../../../images/comment/null_comment.png",
                list: n
            }), this.conf.offset += 10, this.conf.lock = !1;
        }
    },
    getListFail: function(t) {
        this.setData({
            request_status: !1
        }), this.conf.lock = !1;
    },
    add_comment: function(t) {
        var e = this;
        this.conf.login_status ? (this.setData({
            add_comment_hide: "add-comment-show"
        }), setTimeout(function() {
            e.setData({
                textarea_type: !0
            });
        }, 50)) : this.jumpLogin();
    },
    text_focus: function(t) {
        this.conf.model;
        var e = 2 * t.detail.height + this.conf.comment_height;
        this.setData({
            comment_height: e
        });
    },
    text_blur: function() {
        this.setData({
            textarea_type: !1,
            add_comment_hide: "add-comment-hide"
        });
    },
    content_monitor: function(t) {
        var e = t.detail.value;
        this.conf.comment_content = e;
    },
    release_comment: function(t) {
        "" != this.conf.comment_content && (this.setData({
            user_comment_content: this.conf.comment_content
        }), this.postComment());
    },
    release_button: function() {
        "" != this.conf.comment_content && (this.setData({
            user_comment_content: this.conf.comment_content
        }), this.postComment());
    },
    postComment: function() {
        this.conf.add_comment_lock && (this.conf.add_comment_lock = !1, e.post("Content/Recipe/addComment", {
            rid: this.conf.recipe_id,
            data: this.conf.comment_content
        }, this.addCommentSuccess.bind(this)));
    },
    addCommentSuccess: function(t) {
        if (551 != t.Status && 552 != t.Status || this.jumpLogin(), 200 == t.Status) {
            this.data.list.unshift(t.Result);
            var e = this.data.list, n = this.data.comment_count + 1;
            this.setData({
                list: e,
                user_comment_content: "",
                comment_count: n
            }), wx.showToast({
                title: "发布成功",
                icon: "success",
                duration: 1500
            }), this.conf.add_comment_lock = !0;
        }
    },
    commee_digg_add: function(t) {
        var e = t.currentTarget.dataset.id, n = t.currentTarget.dataset.type;
        "" == e || n || this.postDigg(e);
    },
    jumpLogin: function() {
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    postDigg: function(t) {
        var n = this;
        e.post("Content/Recipe/addCommentDigg", {
            rid: this.conf.recipe_id,
            cid: t
        }, function(o) {
            if (200 == o.Status) {
                for (var i = n.data.list, s = 0; s < i.length; s++) i[s].CommentId == t && (i[s].DiggNum += 1, 
                i[s].DiggStatus = !0);
                n.setData({
                    list: i
                });
                var c = n.conf.comment_digg_storagep;
                c.includes(t) || (c.unshift(t), c.length > 50 && (c = c.slice(0, 50))), e.setStorage("comment", c);
            }
        });
    },
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: this.conf.share_title,
            path: "/pages/recipe/recipe?id=" + this.conf.recipe_id
        };
    }
});