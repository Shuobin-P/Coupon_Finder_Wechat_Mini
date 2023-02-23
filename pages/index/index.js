// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    active: 1,
    number: 22,
    imageURL: "https://img95.699pic.com/photo/50075/6447.jpg_wh300.jpg",
    cardList: [
        {
            title: "测试1",
            originPrice: 100,
            price: 20,
        },
        {
            title: "测试2",
            originPrice: 200,
            price: 50,
        }
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },


})
