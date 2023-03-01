// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: [
            "https://img95.699pic.com/photo/50075/6447.jpg_wh300.jpg",
        ],
        indicatorDots: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {
            id
        } = options;
        console.log(id);
        //TODO 去后台请求id对应的数据
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