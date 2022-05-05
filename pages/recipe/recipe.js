function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e, i, o = getApp(), s = require("../../require.js");

Page((i = {
    data: (e = {
        details: {
            Cover: "../../images/recipe/cover_null.jpg",
            Title: "菜谱数据加载中...",
            AuthorAvatar: "../../images/common/default_avatar.png",
            AuthorName: "{菜谱作者}",
            ViewCount: "{0}",
            LikeCount: "{0}",
            UserName: "{菜谱作者}"
        },
        request_status: !0,
        height: "",
        head_occupy: 128,
        status_bar_height: 40,
        type: 0,
        recipe_id: ""
    }, t(e, "type", ""), t(e, "cover", ""), t(e, "video_cover", ""), t(e, "title", ""), 
    t(e, "video_url", ""), t(e, "view_count", ""), t(e, "like_count", ""), t(e, "user_name", ""), 
    t(e, "user_avatar", ""), t(e, "intro", ""), t(e, "cookie_time", ""), t(e, "enjoy_user", ""), 
    t(e, "recipe_food", []), t(e, "recipe_step", []), t(e, "step_count", 0), t(e, "tips", ""), 
    t(e, "digg_recipe", ""), t(e, "recipe_digg_status", !1), t(e, "update_time", ""), 
    t(e, "comment", []), t(e, "related_recipe", ""), t(e, "isfavrite", !1), t(e, "isattention", !1), 
    t(e, "isdigg", !1), t(e, "type_class", "recipe-default"), t(e, "head_hide", ""), 
    t(e, "return_img", ""), t(e, "bottom_but_class", "comment-but-hide"), t(e, "step_show", "step-hide"), 
    t(e, "unfurl_type", !1), t(e, "cook_time_right", ""), t(e, "textarea_type", !1), 
    t(e, "add_comment_hide", "add-comment-hide"), t(e, "user_comment_content", ""), 
    t(e, "comment_text_height", 890), t(e, "food_ad_list", []), t(e, "food_fold_status", "food-hide"), 
    t(e, "fold_food_btn", "fold-show"), t(e, "fold_step_btn", "fold-show"), t(e, "fold_height", 1334), 
    t(e, "fold_btn_height", 1060), t(e, "fold_status", "none"), e),
    conf: {
        lock: !1,
        login_status: !1,
        type: 0,
        isfavrite: !1,
        scroll_top: 0,
        recipe_id: "",
        recipe_title: "",
        baidu_title: "",
        recipe_picurl: "",
        offset: 0,
        scroll_type: !1,
        step_show: !1,
        digg_storagep: [],
        recipe_digg: 0,
        recipe_digg_storagep: [],
        comment_digg_storagep: [],
        recipe_digg_type: !1,
        pages_num: 0,
        step_img: [],
        scroll_up_lock: !0,
        scroll_down_lock: !0,
        interface_lock: !0,
        rebound_lock: !0,
        return_top: !0,
        page_info_lock: !1,
        comment_height: 280,
        page_position: "video",
        height: 667,
        page_height: 667,
        pull_up: 150,
        drop_down: 571,
        scroll_direction: "down",
        direction_but_class: "",
        direction_but_lock: !0,
        but_scroll_lock: !0,
        direction_but_height: 15,
        add_comment_lock: !0,
        comment_content: "",
        share_title: o.conf.shareinfo.title,
        share_desc: o.conf.shareinfo.content,
        share_img: o.conf.shareinfo.picurl,
        clipboard_msg: "",
        page_info: []
    },
    onLoad: function(t) {
        var e = t.id, i = (t.type, s.isLogin());
        this.conf.recipe_id = e, this.conf.login_status = i;
        var n = o.conf.systeminfo;
        n.statusBarHeight;
        this.data.fold_height = 2 * n.screenHeight, this.data.fold_btn_height = 2 * n.screenHeight - 206 - 60, 
        this.getDetail();
    },
    onShow: function() {
        var t = this;
        this.conf.login_status = s.isLogin(), s.loginChange(function(e) {
            t.conf.login_status = !0, t.getDetail(), wx.showToast({
                title: "登录成功",
                icon: "success",
                duration: 1500
            });
        });
        var e = getCurrentPages();
        this.conf.pages_num = e.length;
    },
    onReachBottom: function() {
        this.conf.direction_but_lock = !1, this.setData({
            bottom_but_class: ""
        });
    },
    onPageScroll: function(t) {
        var e = t.scrollTop;
        e > 0 && (0 == e ? this.conf.scroll_top = e : (e > this.conf.scroll_top && e - this.conf.scroll_top > this.conf.direction_but_height && this.conf.but_scroll_lock && (this.conf.scroll_direction = "up", 
        this.conf.but_scroll_lock = !1, this.conf.direction_but_lock = !0), e < this.conf.scroll_top && this.conf.scroll_top - e > this.conf.direction_but_height && !this.conf.but_scroll_lock && (this.conf.scroll_direction = "down", 
        this.conf.but_scroll_lock = !0), this.conf.scroll_top = e)), this.directionBut(e);
    },
    directionBut: function(t) {
        var e = this;
        "" == this.conf.direction_but_class && "up" == this.conf.scroll_direction && this.conf.direction_but_lock && (this.setData({
            bottom_but_class: "button-gradually-hide"
        }), setTimeout(function(t) {
            e.setData({
                bottom_but_class: "comment-but-hide"
            }), e.conf.direction_but_class = "comment-but-hide";
        }, 500)), "comment-but-hide" == this.conf.direction_but_class && "down" == this.conf.scroll_direction && (this.setData({
            bottom_but_class: ""
        }), this.conf.direction_but_class = "");
    },
    return_but: function(t) {
        this.conf.pages_num > 1 ? wx.navigateBack({
            delta: 1
        }) : wx.switchTab({
            url: "/pages/index/index"
        });
    },
    getDetail: function() {
        this.conf.lock || (this.conf.lock = !0, s.get("Content/Recipe/getDetail", {
            rid: this.conf.recipe_id
        }, this.getDetailSuccess.bind(this), this.getDetailFail.bind(this)));
    },
    getDetailSuccess: function(t) {
        if (200 != t.Status || !t.Result.RecipeStep) return this.setData({
            request_status: !1
        }), !1;
        var e = [];
        t.Result.Food && t.Result.Food.List.length > 0 && (e = t.Result.Food.List);
        var i = [], n = 0;
        t.Result.RecipeStep && t.Result.RecipeStep.List.length > 0 && (i = t.Result.RecipeStep.List, 
        n = t.Result.RecipeStep.Count, this.conf.step_img = t.Result.StepImg);
        var c = [], a = [];
        if (t.Result.Comment && t.Result.Comment.List.length > 0) {
            a = "" != s.getStorage("comment") ? s.getStorage("comment") : [];
            for (var r = 0; r < t.Result.Comment.List.length; r++) a.includes(t.Result.Comment.List[r].CommentId) ? t.Result.Comment.List[r].DiggStatus = !0 : t.Result.Comment.List[r].DiggStatus = !1;
            c = t.Result.Comment.List;
        }
        var l = [];
        if (t.Result.RelatedRecipe && t.Result.RelatedRecipe.List.length > 0) {
            var _ = t.Result.RelatedRecipe.List.length;
            if (!o.videomode) {
                for (var u = 0; u < _; u++) t.Result.RelatedRecipe.List[u].Style || (t.Result.RelatedRecipe.List[u].Type = 0);
                t.Result.Type = 0;
            }
            l = t.Result.RelatedRecipe.List;
        }
        var d = "recipe-default", h = !1, f = this.data.head_hide, p = "";
        if (2 == t.Result.Type && (d = "", h = !0, p = "comment-but-hide", f = "head-hide", 
        void 0 == this.video)) {
            var g = wx.createVideoContext("recipe_video");
            this.video = g;
        }
        var m = s.getStorage("recipe"), R = !!(m = "" == m ? [] : m).includes(t.Result.RecipeId), v = !!R, b = "";
        b = "" != t.Result.BaiduTitle ? t.Result.BaiduTitle : t.Result.Title;
        var S = t.Result.EnjoyUser, D = t.Result.CookieTime, C = "";
        "" == S && (C = "text-align: right;"), "" != t.Result.RecipeId && "" != b && 0 != i.length || (this.setData({
            request_status: !1
        }), this.conf.lock = !1);
        var k = t.Result.Cover, w = "";
        "" != k && (w = k.replace(/_360/, "_720"));
        var y = this.data.food_fold_status, L = this.data.fold_height, T = this.data.fold_btn_height, x = this.data.fold_status, I = this.data.fold_step_btn, F = this.data.fold_food_btn;
        if (t.Result.Config && t.Result.Config.RecipeFold) {
            var j = t.Result.Config.RecipeFold;
            j.Status ? (t.Result.Food.Count <= 5 && (y = "food-show", F = "fold-hide"), 0 == t.Result.StepImg.length && (L = "auto", 
            I = "fold-hide", x = "block"), T = (L = parseInt(L) + parseInt(j.Style, 10)) - 206 - 60) : (y = "food-show", 
            F = "fold-hide", L = "auto", I = "fold-hide", x = "block");
        }
        var A = {
            recipe_id: t.Result.RecipeId,
            type: t.Result.Type,
            cover: k,
            video_cover: w,
            title: b,
            video_url: t.Result.VideoUrl,
            view_count: t.Result.ViewCount,
            like_count: t.Result.LikeCount,
            user_name: t.Result.UserName,
            user_avatar: t.Result.UserAvatar,
            intro: t.Result.Intro,
            cookie_time: D,
            enjoy_user: S,
            cook_time_right: C,
            recipe_food: e,
            isdigg: R,
            recipe_step: i,
            step_count: n,
            tips: t.Result.Tips,
            digg_recipe: t.Result.DiggNum,
            update_time: t.Result.UpdateTime,
            comment: c,
            comment_count: t.Result.CommentCount,
            related_recipe: l,
            isfavrite: t.Result.IsFavorite,
            isattention: t.Result.IsAttention,
            type_class: d,
            bottom_but_class: p,
            food_ad_list: t.Result.FoodAdList.List,
            head_hide: f,
            food_fold_status: y,
            fold_food_btn: F,
            fold_height: L,
            fold_btn_height: T,
            fold_step_btn: I,
            fold_status: x
        }, B = {
            lock: !1,
            type: t.Result.Type,
            isfavrite: t.Result.IsFavorite,
            isattention: t.Result.IsAttention,
            recipe_id: t.Result.RecipeId,
            recipe_title: b,
            baidu_title: t.Result.BaiduTitle,
            recipe_picurl: t.Result.Cover,
            recipe_digg: t.Result.DiggNum,
            scroll_type: h,
            recipe_digg_storagep: m,
            recipe_digg_type: v,
            comment_digg_storagep: a,
            share_title: b,
            share_desc: t.Result.Description,
            share_img: t.Result.Cover
        };
        this.setData(A), this.conf = Object.assign(this.conf, B);
    },
    recipeDigg: function(t) {
        var e = this;
        if (this.conf.recipe_digg_type) {
            this.conf.recipe_digg -= 1, this.setData({
                isdigg: !1,
                digg_recipe: this.conf.recipe_digg
            }), this.conf.recipe_digg_type = !1;
            var i = this.conf.recipe_digg_storagep;
            if (i.includes(this.conf.recipe_id)) for (var o = 0; o < i.length; o++) i[o] == this.conf.recipe_id && i.splice(o, 1);
            s.setStorage("recipe", i);
        } else this.conf.recipe_digg += 1, s.post("Content/Recipe/addDigg", {
            rid: this.conf.recipe_id
        }, function(t) {
            if (200 == t.Status) {
                e.setData({
                    isdigg: !0,
                    digg_recipe: e.conf.recipe_digg
                }), e.conf.recipe_digg_type = !0;
                var i = e.conf.recipe_digg_storagep;
                i.includes(e.conf.recipe_id) || (i.unshift(e.conf.recipe_id), i.length > 30 && (i = i.slice(0, 30))), 
                s.setStorage("recipe", i);
            }
        });
    },
    getDetailFail: function(t) {
        this.setData({
            request_status: !1
        }), this.conf.lock = !1;
    },
    previewImg: function(t) {
        var e = t.currentTarget.dataset.img;
        wx.previewImage({
            current: e,
            urls: this.conf.step_img
        });
    },
    onShareAppMessage: function() {},
    attentionBut: function(t) {
        var e = this;
        this.conf.isattention ? s.post("Content/Recipe/unfollow", {
            rid: this.conf.recipe_id
        }, function(t) {
            551 != t.Status && 552 != t.Status || e.jumpLogin(), 200 == t.Status && (e.setData({
                isattention: !1
            }), e.conf.isattention = !1);
        }) : s.post("Content/Recipe/follow", {
            rid: this.conf.recipe_id
        }, function(t) {
            551 != t.Status && 552 != t.Status || e.jumpLogin(), 200 == t.Status && (e.setData({
                isattention: !0
            }), e.conf.isattention = !0, wx.showToast({
                title: "关注成功",
                icon: "success",
                duration: 1500
            }));
        });
    },
    commee_digg_add: function(t) {
        var e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.type;
        "" == e || i || this.postDigg(e);
    },
    postDigg: function(t) {
        var e = this;
        s.post("Content/Recipe/addCommentDigg", {
            rid: this.conf.recipe_id,
            cid: t
        }, function(i) {
            if (200 == i.Status) {
                for (var o = e.data.comment, n = 0; n < o.length; n++) o[n].CommentId == t && (o[n].DiggNum += 1, 
                o[n].DiggStatus = !0);
                e.setData({
                    comment: o
                });
                var c = e.conf.comment_digg_storagep;
                c.includes(t) || (c.unshift(t), c.length > 50 && (c = c.slice(0, 50))), s.setStorage("comment", c);
            }
        });
    },
    add_comment: function() {
        var t = this;
        this.conf.login_status ? (this.setData({
            add_comment_hide: "add-comment-show"
        }), setTimeout(function() {
            t.setData({
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
    content_confirm: function() {
        "" != this.conf.comment_content && (this.setData({
            user_comment_content: this.conf.comment_content
        }), this.postComment());
    },
    postComment: function() {
        this.conf.add_comment_lock && (this.conf.add_comment_lock = !1, s.post("Content/Recipe/addComment", {
            rid: this.conf.recipe_id,
            data: this.conf.comment_content
        }, this.addCommentSuccess.bind(this)));
    },
    addCommentSuccess: function(t) {
        if (551 != t.Status && 552 != t.Status || this.jumpLogin(), 200 == t.Status) {
            this.data.comment.unshift(t.Result);
            var e = this.data.comment, i = this.data.comment_count + 1;
            this.setData({
                comment: e,
                user_comment_content: "",
                comment_count: i
            }), wx.showToast({
                title: "发布成功",
                icon: "success",
                duration: 1500
            });
        }
        this.conf.add_comment_lock = !0;
    },
    favoriteRecipe: function(t) {
        var e = this;
        this.conf.isfavrite ? s.post("Content/Recipe/cancelFavorite", {
            rid: this.conf.recipe_id
        }, function(t) {
            551 != t.Status && 552 != t.Status || e.jumpLogin(), 200 == t.Status && (e.setData({
                isfavrite: !1
            }), e.conf.isfavrite = !1);
        }) : (wx.reportAnalytics("favorite_click"), s.post("Content/Recipe/addFavorite", {
            rid: this.conf.recipe_id
        }, function(t) {
            551 != t.Status && 552 != t.Status || e.jumpLogin(), 200 == t.Status && (e.setData({
                isfavrite: !0
            }), e.conf.isfavrite = !0, wx.showToast({
                title: "收藏成功",
                icon: "success",
                duration: 1500
            }));
        }));
    }
}, t(i, "onShareAppMessage", function(t) {
    o.getDefaultShareInfo();
    return {
        title: this.conf.share_title,
        path: "/pages/recipe/recipe?id=" + this.conf.recipe_id + "&type=" + this.conf.type
    };
}), t(i, "jumpLogin", function() {
    wx.navigateTo({
        url: "/pages/login/login"
    });
}), t(i, "foodFold", function() {
    this.setData({
        food_fold_status: "food-show",
        fold_food_btn: "fold-hide"
    });
}), t(i, "stepFold", function() {
    this.setData({
        fold_height: "auto",
        fold_step_btn: "fold-hide",
        fold_status: "block"
    });
}), i));