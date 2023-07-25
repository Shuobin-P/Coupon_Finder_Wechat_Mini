const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrCodeURL: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let wallet_id = options.wallet_id;
        let coupon_id = options.coupon_id;
        console.log("钱包ID为：" + wallet_id);
        console.log("优惠券ID为：" + coupon_id);
        this.setData({
            qrCodeURL: app.globalData.url + '/coupon/generateQRCode' + '?content=' + encodeURIComponent(app.globalData.url + '/coupon/useCoupon?wallet_id=' + wallet_id +'&coupon_id=' + coupon_id),
        })
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

    }
})