const app = getApp()
Page({
    data: {
        imageURL: '',
        title: '',
        desc: '',
        pageNum: 1,
        historyPageNum: 1,
        pageSize: 10,
        walletID: -1,
        hasMore: true, // 是否还有更多数据
        hasMoreUsedHistory: true,
        cardList: [],
        usedCouponList: [],
        activeTab: 0,
    },
    //用户每次进入该页面，都会调用该函数，可用来刷新
    onShow() {
        //请求后台接口，传入用户的账号信息，返回该用户拥有的有效优惠券
        this.getInitAvailableCouponData()
    },
    onChange(event) {
        this.data.activeTab = event.detail.index;
        if(this.data.activeTab == 1) {
            this.getInitUsedCouponHistory()
        }
    },
    getMoreAvailableCouponData() {
        if (!this.data.hasMore) {
            return
        }
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: app.globalData.url + '/wallet/getAvailableCoupons',
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
                    //TODO 需要拿到wallet_id
                    ["cardList"]: newDataList,
                    ["hasMore"]: data.length >= _this.data.pageSize,
                    pageNum: _this.data.pageNum + 1,
                    walletID: getWalletID()
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
    getInitAvailableCouponData() {
        //请求后台接口，传入用户的账号信息，返回该用户拥有的有效优惠券
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: app.globalData.url + '/wallet/getAvailableCoupons',
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
                    //TODO 需要拿到wallet_id
                    ["cardList"]: res.data.data,
                    ["hasMore"]: res.data.data.length >= _this.data.pageSize,
                    ["walletID"]: _this.getWalletID()
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
    getInitUsedCouponHistory() {
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        wx.request({
            url: app.globalData.url + '/wallet/getCouponUsedHistory',
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            data: {
                historyPageNum: 1,
                pageSize: this.data.pageSize,
            },
            success: (res) => {
                wx.hideLoading();
                _this.setData({
                    //TODO 需要拿到wallet_id
                    ["usedCouponList"]: res.data.data,
                    ["hasMoreUsedHistory"]: res.data.data.length >= _this.data.pageSize,
                    ["walletID"]: _this.getWalletID()
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
    getWalletID() {
        let _this = this;
        wx.request({
            url: app.globalData.url + "/wallet/getWalletID",
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            success: (res) => {
                _this.setData({
                    walletID: res.data.data
                })
            }
        })
        return _this.data.walletID;
    },
    onReachBottom() {
        // 加载下一页数据
        if (this.data.activeTab === 0) {
            this.getMoreAvailableCouponData();
        } else if (this.data.activeTab === 1) {
            this.getMoreAvailableUsedCouponHistory();
        }
    },
    onDelete(event) {
        //点击事件
        const {
            index,
            id
        } = event.currentTarget.dataset;
        const {
            cardList
        } = this.data;

        //TODO 调用后台删除接口，删除数据
        console.log("CouponID:" + id);
        wx.request({
            url: app.globalData.url + '/wallet/deleteCoupon',
            data: {
                id: id
            },
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            success(res) {
                wx.showToast({
                    title: '成功删除优惠券！',
                    icon: 'success',
                })
            },
            fail(res) {
                wx.showToast({
                    title: '删除失败，请重试',
                    icon: 'none',
                })
            }
        })
        cardList.splice(index, 1);
        this.setData({
            cardList
        });
    },
    onGetQRCode(event) {
        //展示优惠券二维码
        console.log(event);
        let wallet_id = this.getWalletID();
        //let wallet_id = 1;
        console.log(wallet_id);
        wx.navigateTo({
            url: '/pages/wallet/qrCode/qrCode?coupon_id=' + event.currentTarget.dataset.coupon_id + '&wallet_id=' + wallet_id
        })
    },
}
)