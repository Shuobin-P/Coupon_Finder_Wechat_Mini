// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        activeTab: 1,
        number: 22,
        imageURL: "https://img95.699pic.com/photo/50075/6447.jpg_wh300.jpg",
        cardList: [{
            title: "默认初始数据",
            originPrice: 100,
            price: 20,
        }]
    },
    onChange(event) {
        this.data.activeTab = event.detail.index;
        //如果this.activeTab = 0 则 cardList = 请求对应后台接口的数据
        if (this.data.activeTab === 0) {
            this.setData({
                cardList: [{
                    title: "美食测试",
                    originPrice: 100,
                    price: 20,
                }],
                activeTab: 0
            })
        } else if (this.data.activeTab === 1) {
            this.getDrinkData();
        }
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    /*从微信进入第一次进入该页面时，这个函数会先被调用，那么
    页面需要展示的数据，也是从这里向后台拿 */
    onLoad() {
        this.getDrinkData();
    },
    /*从别的页面进入该页面时，更新页面数据 */
    onShow() {
        this.getDrinkData();
    },
    getDrinkData() {
        let _this = this;
        wx.request({
            url: 'http://localhost:8080/coupon/getHotCoupons', // 后台 API 地址
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                _this.setData({
                    //这个res有点问题，这里把cardList的值写死的话，就没啥问题
                    ["cardList"]: res.data.data
                })
            },
            fail(err) {
                console.error(err);
            }
        });
    },

})