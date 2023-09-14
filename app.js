// app.js
const app = getApp();
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 token
                wx.showLoading({
                    title: '登录中...',
                });
                wx.request({
                    url: this.globalData.url+'/login',
                    data: {
                        code: res.code
                    },
                    method: "POST",
                    success: res => {
                        wx.hideLoading();
                        if(res.statusCode !="200") {
                            return wx.showToast({
                                title: res.data.message,
                                icon: 'error',
                                duration: 2000
                            });
                        }
                        wx.setStorageSync('token', `${res.data.data.tokenHead} ${res.data.data.token}`);
                    },
                    fail: res => {
                        console.log('后台登录接口请求失败: -->', res);
                    }
                })
            },
        })
    },
    globalData: {
        url: "http://localhost:5000",
        qiniuImgPrefix: "http://shuobin.tech"
    }
})