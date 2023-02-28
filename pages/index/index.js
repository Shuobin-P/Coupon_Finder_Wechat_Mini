// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        activeTab: 1,
        imageURL: "https://img95.699pic.com/photo/50075/6447.jpg_wh300.jpg",
        pageNum: 1,
        pageSize: 10,
        hasMore: true, // 是否还有更多数据
        cardList: []
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

        }
        //下面这里好像activeTab赋值好像有问题。
        else if (this.data.activeTab === 1) {
            //数据为切换到美食tab，再切换回来，cardList中的数据要清空
            this.setData({
                cardList: [],
                pageNum: 1
            })

            this.getInitDrinkData();
            
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
        //如果调用this.this.getDrinkData();
        //显示的数据会出现重复
    },
    /*从别的页面进入该页面时，更新页面数据 */
    onShow() {
        //onLoad和onShow如果都调用getDrinkData则会出现数据重复的问题
    },
    getInitDrinkData() {
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: 'http://localhost:8080/coupon/getHotCoupons', // 后台 API 地址
            data: {
                pageNum: 1,
                pageSize: this.data.pageSize,
            },
            success(res) {
                wx.hideLoading();
                _this.setData({
                    ["cardList"]: res.data.data,
                    ["hasMore"]: res.data.data.length >= _this.data.pageSize,
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
    getMoreDrinkData() {
        if (!this.data.hasMore) {
            return
        }
        wx.showLoading({
            title: '加载中...',
        })

        let _this = this;
        wx.request({
            url: 'http://localhost:8080/coupon/getHotCoupons', // 后台 API 地址
            data: {
                pageNum: this.data.pageNum + 1,
                pageSize: this.data.pageSize,
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                wx.hideLoading();
                const data = res.data.data || []
                const newDataList = _this.data.cardList.concat(data)
                _this.setData({
                    ["cardList"]: newDataList,
                    ["hasMore"]: data.length >= _this.data.pageSize,
                    pageNum: _this.data.pageNum + 1,
                })
            },
            fail(err) {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败，请重试',
                    icon: 'none',
                })
            }
        });
    },
    // 上滑触底事件
    onReachBottom() {
        // 加载下一页数据
        this.getMoreDrinkData();
    },
    toDetail(event) {
		wx.navigateTo({
			url: `/pages/detail/detail?id=${event.target.dataset.id}`
		});
	},
})