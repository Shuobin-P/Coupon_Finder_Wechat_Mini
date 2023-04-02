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
    //FIXME 不知道不使用https协议能否使用这个功能，在局域网里面应该可以不一定要使用https，之前做某个功能的使用，我也以为一定要https来着，但事实上并不需要
    toScanQRcode() {
        let tmp = common.isMerchant();
        if (tmp == true) {
            wx.scanCode({
                success(res) {
                    //可以展示res的内容
                    wx.request({
                        //商家确认并扣除该优惠券
                        //FIXME 少了一个消费者wallet_id参数，应该是
                        //生成二维码的那个地方出现了问题
                        url: res.result,
                        header: {
                            'Authorization': wx.getStorageSync('token')
                        },
                        success: (res) => {
                            console.log(res.data.data);
                            console.log(res.data);
                            if (res.data.code == 1) {
                                wx.showToast({
                                    title: "成功使用优惠券",
                                    icon: 'success',
                                    duration: 2000
                                })
                            }else {
                                wx.showToast({
                                    title: "使用失败",
                                    icon: 'fail',
                                    duration: 2000
                                })
                            }
                        }
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
        let temp = common.isMerchant();
        if (temp == true) {
            wx.showToast({
                title: '已完成身份认证',
            })
        } else {
            wx.navigateTo({
                url: './verification/verification',
            })
        }
    },

    toRelease() {
        if (common.isMerchant()) {
            wx.navigateTo({
                url: './release/release',
            })
        } else {
            wx.showToast({
                title: '请先完成商家身份验证',
            })
        }
    }
})