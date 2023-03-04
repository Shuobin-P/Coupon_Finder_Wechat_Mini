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
        present_price: -1,
        original_price: -1,
        total_quantity: -1,
        used_quantity: -1,
        start_date: "1999-01-01",
        expire_date: "3000-01-01",
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
                    bannerImages: _this.data.pictureUrl,
                    title: _this.data.title,
                    present_price: _this.data.presentPrice,
                    original_price: _this.data.originalPrice,
                    used_quantity: _this.data.usedQuantity,
                    total_quantity: _this.data.totalQuantity
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