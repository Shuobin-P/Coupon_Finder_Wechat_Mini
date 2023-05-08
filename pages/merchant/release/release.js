// pages/merchant/release/release.js
import Toast from '@vant/weapp/toast/toast';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        description: "",
        quantity: "",
        originalPrice: "",
        presentPrice: "",
        columns: ['美食', '饮品', '其它'],
        category: "",
        fileList: [],
        detailList: [],
        productURL: "",
        productDetailURL: [],
        startDate: new Date().getTime(),
        minDate: new Date().getTime(),
        expireDate: new Date().getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            }
            if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
    },
// minDate 表示用户可选的最小时间
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


    onConfirm(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        Toast(`当前值：${value}, 当前索引：${index}`);
        this.setData({
            category: value,
        })
    },

    onCancel() {
        Toast('取消');
    },

    onInputStartDate(event) {
        this.setData({
            startDate: event.detail,
        });
    },
    onInputExpireDate(event) {
        this.setData({
            expireDate: event.detail,
        });
    },

    afterRead(event) {
        const {
            file
        } = event.detail;
        console.log(file);
        let _this = this;
        wx.uploadFile({
            url: app.globalData.url+'/merchant/upload', 
            filePath: file.url,
            name: 'file',
            formData: {
                user: 'test'
            },
            success(res) {
                // 上传完成需要更新 fileList
                const {
                    fileList = []
                } = _this.data.fileList;
                fileList.push({
                    ...file,
                    url: res.data
                });
                _this.setData({
                    fileList,
                    productURL: JSON.parse(res.data).data
                });

            },
            fail(res) {
                console.log("上传失败");
            }
        });
    },

    detailAfterRead(event) {
        const {
            file
        } = event.detail;
        console.log(file);
        let _this = this;
        wx.uploadFile({
            url: app.globalData.url+'/merchant/upload', 
            filePath: file.url,
            name: 'file',
            formData: {
                user: 'test'
            },
            success(res) {
                // 上传完成需要更新 fileList
                // FIXME 上传多张图片要对detailList进行拼接。
                const {
                    detailList = []
                } = _this.data.detailList;
                detailList.push({
                    ...file,
                    url: res.data
                });
                _this.setData({
                    detailList: _this.data.detailList.concat(detailList),
                });
                _this.data.productDetailURL.push(JSON.parse(res.data).data);
            },
            fail(res) {
                console.log("上传失败");
            }
        });
    },

    onCommit() {
        if(this.data.category.length == 0) {
            wx.showToast({
              title: '请选择优惠券类别',
            })
            return;
        }
        wx.request({
            url: app.globalData.url+"/merchant/commitNewCouponInfo",
            method: "POST",
            header: {
                'Authorization': wx.getStorageSync('token')
            },
            data: {
                title: this.data.title,
                description: this.data.description,
                quantity: this.data.quantity,
                originalPrice: this.data.originalPrice,
                presentPrice: this.data.presentPrice,
                category: this.data.category,
                productURL: this.data.productURL,
                productDetailURL: this.data.productDetailURL,
                startDate: this.data.startDate,
                expireDate: this.data.expireDate
            },
            success(res) {
               wx.showToast({
                 title: '成功发布新优惠券',
               })
            }
    })
},


})
