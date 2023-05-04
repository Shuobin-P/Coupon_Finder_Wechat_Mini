const app = getApp()
Page({
    data: {
      hotList: [],
      historyList: [],
      cardList: [],
      pageNum: 1,
      pageSize: 10,
      hasMore: true, 
      isShowHistory: true,
      isShowHot: true,
      isShowSearchResult: true,
      queryInfo: "",
      top_n: 10
    },
    onLoad() {
        this.setData({
          historyList: this.getHistoryList(),
        })
        this.getHotList()
    },
    onSearchInput(event){
        this.setData({
            isShowHistory: true,
            isShowHot: true,
            isShowSearchResult: false,
        })
    },
    /**
     * 同步用户在输入框输入的值
     */
    onChange(e) {
        this.setData({
            queryInfo: e.detail,
        });
    },
    onSearch(){
        let keyword = this.data.queryInfo
        this.addHistory(keyword)
        this.setData({
            isShowHistory: false,
            isShowHot: false,
            isShowSearchResult: true
        })
        this.updateKeywordsAppearingTimes()
        this.getHotList()
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
    addHistory(keyword) {
        let historyList = this.getHistoryList()
        // 如果历史记录中已经存在该关键词，先将其删除，避免出现重复记录
        let index = historyList.indexOf(keyword)
        if (index !== -1) {
          historyList.splice(index, 1)
        }
        // 将新的关键词添加到历史记录数组中
        historyList.unshift(keyword)
        // 只保留最近的10条记录
        if (historyList.length > 10) {
          historyList = historyList.slice(0, 10)
        }
        this.setHistoryList(historyList)
    },
    getHistoryList() {
        let historyList = wx.getStorageSync('historyList')
        if (!historyList) {
          historyList = []
        } else {
          historyList = JSON.parse(historyList)
        }
        return historyList
    },
    // 更新本地存储中的搜索历史记录
    setHistoryList(historyList) {
        wx.setStorageSync('historyList', JSON.stringify(historyList))
        this.setData({
            historyList: this.getHistoryList()
        })
    },  
    clearHistory() {
        this.setData({
            historyList: []
        })
        wx.setStorageSync('historyList', null)
    },
    getHotList() {
        let _this = this
        wx.request({
          url: app.globalData.url+ '/search/getTopNHotSearchKeywords',
          data: {
            top_n: this.data.top_n
         },
          header: {
            'Authorization': wx.getStorageSync('token')
         },
          success(res) {
              _this.setData({
                  hotList:res.data.data  
              })
         },
          fail(err) {
                wx.showToast({
                 title: '加载热门搜索失败，请重试',
                 icon: 'none',
            })
         }
        })
    },
    tapToSearch(event) {
        let value = event.currentTarget.dataset.value;
        let _this = this
        _this.setData({
            queryInfo: value
        })
        _this.onSearch()
    },
    getInitData() {
        wx.showLoading({
            title: '加载中...',
        })
        let _this = this;
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
    updateKeywordsAppearingTimes() {
        wx.request({
            url: app.globalData.url+'/search/updateKeywordsAppearingTimes', 
            data: {
                keywords: this.data.queryInfo,
            },
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            success(res) {
            },
            fail(err) {
                wx.hideLoading();
                wx.showToast({
                    title: '请求更新搜索关键词异常，请重试',
                    icon: 'none',
                })
            }
        })
    },
    toCouponDetail(event) {
		wx.navigateTo({
			url: `/pages/detail/detail?id=${event.target.dataset.id}`
		});
    },
  })
  