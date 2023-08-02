// pages/merchant/verification/verification.js
const app = getApp();
var common = require('../../common/common.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        key: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
    /**
     * 提交用户输入的信息
     */
    onCommit() {
        wx.request({
            //商家确认并扣除该优惠券
            url: app.globalData.url + "/merchant/verify?key=" + this.data.key,
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            success: res => {
                if (res.data.data.code == 0) {
                    wx.showToast({
                        title: '密钥错误 请重试',
                    })
                } else if (res.data.data.code == 1) {
                    wx.setStorageSync('token', `${res.data.data.token}`);
                    wx.showToast({
                        title: '已完成商家认证，快去发布优惠券吧！',
                    })
                }
            },
            fail: res => {
                wx.showToast({
                    title: '请求失败，请重试',
                })
            }

        })
    },


})