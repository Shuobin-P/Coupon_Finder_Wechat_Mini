// pages/merchant/merchant.js
var common = require('../common/common.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
    scanQRcode() {
        let tmp = common.isMerchant();
        if (tmp == true) {
            wx.scanCode({
                success(res) {
                    //可以展示res的内容
                    wx.request({
                        //商家确认并扣除该优惠券
                        url: res.result,
                        header: {
                            'Authorization': wx.getStorageSync('token')
                        },
                    })
                    wx.showToast({
                        title: res.result,
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请先完成商家认证之后再进行扫码操作',
            })
        }
    },

    toVerification() {
        wx.navigateTo({
            url: './verification/verification',
        })
    }
})