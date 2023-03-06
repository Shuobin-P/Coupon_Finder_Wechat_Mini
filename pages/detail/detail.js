// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerImages: [
            "https://img95.699pic.com/photo/50075/6447.jpg_wh300.jpg",
        ],
        title:"默认标题",
        presentPrice: -1,
        originalPrice: -1,
        totalQuantity: -1,
        usedQuantity: -1,
        startDate: "1999-01-01",
        expireDate: "3000-01-01",
        address: "默认地址",
        indicatorDots: true,
        detailImages: [
            "https://img95.699pic.com/photo/50075/6447.jpg_wh300.jpg",
            "https://img95.699pic.com/photo/50075/6447.jpg_wh300.jpg"
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {
            id
        } = options;
        //TODO 去后台请求id对应的数据
        let couponID = id;
        this.getCouponDetail(couponID);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onClickHomeIcon() {
        wx.navigateTo({
            url: '/pages/index/index',
        })
    },
    onClickPacketIcon() {
        wx.navigateTo({
            url: '/pages/wallet/wallet',
        })
    },
    getCouponDetail(couponID) {
        let _this = this;
        wx.request({
            url: 'http://localhost:8080/coupon/getCouponInfo', // 后台 API 地址
            data: {
                id: couponID,
            },
            success(res) {
                wx.hideLoading();
                _this.setData({
                    bannerImages: [res.data.data.pictureUrl],
                    title: res.data.data.title,
                    presentPrice: res.data.data.presentPrice,
                    originalPrice: res.data.data.originalPrice,
                    usedQuantity: res.data.data.usedQuantity,
                    totalQuantity: res.data.data.totalQuantity,
                    detailImages: res.data.data.images,
                    address: res.data.data.address,
                    startDate: res.data.data.startDate,
                    expireDate: res.data.data.expireDate
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
       
    }

})