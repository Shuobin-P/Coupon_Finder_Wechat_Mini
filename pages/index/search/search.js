const app = getApp()
Page({
    data: {
      hotList: ['优惠券1', '优惠券2', '优惠券3', '优惠券4', '优惠券5'],
      historyList: ['优惠券7', '优惠券6', '优惠券3'],
      cardList: [],
      pageNum: 1,
      pageSize: 10,
      hasMore: true, 
      isShowHistory: true,
      isShowHot: true,
      isShowSearchResult: true,
      queryInfo: "",
    },
    onSearchInput(event){
        this.setData({
            isShowHistory: true,
            isShowHot: true,
            isShowSearchResult: false,
            queryInfo: event.detail.queryInfo
        })
    },
    /**
     * 同步用户输入的值
     */
    onChange(e) {
        this.setData({
            queryInfo: e.detail,
        });
    },
    onSearch(){
        //可做一个分页的处理
        this.setData({
            isShowHistory: false,
            isShowHot: false,
            isShowSearchResult: true
        })
        this.getInitData()
    },
    showHistory() {
        if (this.data.historyList.length > 0) {
          this.setData({
              isShowHistory: true,
          })
        }
        if (this.data.hotList.length > 0) {
            this.setData({
                isShowHot: true,
            })
          }
    },
    getInitData() {
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
        console.log("用户输入的值为："+ this.data.value)
        console.log("PageSize的值为："+ this.data.pageSize)

        wx.request({
            url: app.globalData.url+'/coupon/findCoupon', // 后台 API 地址
            data: {
                queryInfo: this.data.queryInfo,
                pageNum: 1,
                pageSize: this.data.pageSize,
            },
            header: {
                'Authorization': wx.getStorageSync('token')
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
    getMoreData() {
        if (!this.data.hasMore) {
            wx.showToast({
                title: '我是有底线的',
                icon: 'none',
            })
            return
        }
        wx.showLoading({
            title: '加载中...',
        })

        let _this = this;
        wx.request({
            url: app.globalData.url+'/coupon/findCoupon', // 后台 API 地址
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
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败，请重试',
                    icon: 'none',
                })
            }
        });
    },
    onReachBottom() {
        this.getMoreData();
    },
  })
  