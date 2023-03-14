Page({
    data: {
        imageURL: 'https://img.yzcdn.cn/vant/ipad.jpeg',
        title: '商品2',
        desc: '商品2的描述',
        pageNum: 1,
        pageSize: 10,
        hasMore: true, // 是否还有更多数据
        cardList: []
    },
    //用户每次进入该页面，都会调用该函数，可用来刷新
    onShow() {
        //请求后台接口，传入用户的账号信息，返回该用户拥有的有效优惠券
        this.getInitDrinkData();
    },
    getMoreAvailableCouponData(){
        if (!this.data.hasMore) {
            return
        }
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: 'http://localhost:8080/wallet/getAvailableCoupons', 
            data: {
                pageNum: this.data.pageNum + 1,
                pageSize: this.data.pageSize,
            },
            header: {
                'content-type': 'application/json',
                'Authorization': wx.getStorageSync('token')
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
                console.log(err)
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                })
            }
        });
    },
    getInitDrinkData() {
        //请求后台接口，传入用户的账号信息，返回该用户拥有的有效优惠券
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: 'http://localhost:8080/wallet/getAvailableCoupons',
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            data: {
                pageNum: 1,
                pageSize: this.data.pageSize,
            },
            success: (res) => {
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
    onReachBottom() {
        // 加载下一页数据
        this.getMoreAvailableCouponData();
    },
}, 
)