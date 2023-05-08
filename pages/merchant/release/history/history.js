// pages/merchant/release/history/history.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeTab: 1,
        upcomingCouponPageNum: 1,
        validCouponPageNum: 1,
        expiredCouponPageNum: 1,
        pageSize: 10,
        upcomingCouponList:[],
        validCouponList: [],
        expiredCouponList: [],
        hasMoreUpcomingCoupon: true,
        hasMoreValidCoupon: true,
        hasMoreExpiredCoupon: true,
        
    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getUpcomingCoupons()
        this.getReleasedValidCoupon()
        this.getExpiredCoupon()
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
    getUpcomingCoupons() {
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: app.globalData.url + '/merchant/getUpcomingCoupons',
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            data: {
                upcomingCouponPageNum: 1,
                pageSize: this.data.pageSize,
            },
            success: (res) => {
                wx.hideLoading();
                _this.setData({
                    ["upcomingCouponList"]: res.data.data,
                    ["hasMoreUpcomingCoupon"]: res.data.data.length >= _this.data.pageSize,
                })
            },
            fail(err) {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败，请重试',
                    icon: 'none',
                })
            }
        })
    },
    
    getReleasedValidCoupon() {
        //请求后台接口，传入用户的账号信息，返回该用户拥有的有效优惠券
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: app.globalData.url + '/merchant/getReleasedValidCoupons',
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            data: {
                validCouponPageNum: 1,
                pageSize: this.data.pageSize,
            },
            success: (res) => {
                wx.hideLoading();
                _this.setData({
                    ["validCouponList"]: res.data.data,
                    ["hasMoreValidCoupon"]: res.data.data.length >= _this.data.pageSize,
                })
            },
            fail(err) {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败，请重试',
                    icon: 'none',
                })
            }
        })
    },

    getExpiredCoupon() {
                wx.showLoading({
                    title: '加载中...',
                })
                let _this = this;
                wx.request({
                    url: app.globalData.url + '/merchant/getExpiredCoupon',
                    header: {
                        'Authorization': wx.getStorageSync('token')
                    },
                    data: {
                        expiredCouponPageNum: 1,
                        pageSize: this.data.pageSize,
                    },
                    success: (res) => {
                        wx.hideLoading();
                        _this.setData({
                            ["expiredCouponList"]: res.data.data,
                            ["hasMoreExpiredCoupon"]: res.data.data.length >= _this.data.pageSize,
                        })
                    },
                    fail(err) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '加载失败，请重试',
                            icon: 'none',
                        })
                    }
                })
    },

    onDeleteUpcomingCoupon(e) {
        const {
            index,
            id
        } = e.currentTarget.dataset;
        const {
            upcomingCouponList
        } = this.data;
        wx.request({
            url: app.globalData.url + '/merchant/deleteUpcomingCoupon',
            data: {
                couponId: id
            },
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            success(res) {
                wx.showToast({
                    title: '成功删除！',
                    icon: 'success',
                })
            },
            fail(res) {
                wx.showToast({
                    title: '删除失败，请重试',
                    icon: 'none',
                })
            }
        })
        upcomingCouponList.splice(index, 1);
        this.setData({
            upcomingCouponList
        });
    }

})