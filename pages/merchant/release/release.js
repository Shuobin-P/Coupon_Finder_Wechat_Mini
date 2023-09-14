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
        total_quantity: "",
        original_price: "",
        present_price: "",
        columns: ['美食', '饮品', '其它'],
        category: "",
        fileList: [],
        detailList: [],
        product_img: "",
        product_detail_img: [],
        start_date: new Date().getTime(),
        minDate: new Date().getTime(),
        expire_date: new Date().getTime(),
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
            start_date: event.detail,
        });
    },
    onInputExpireDate(event) {
        this.setData({
            expire_date: event.detail,
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
            header: {
                'Authorization': wx.getStorageSync('token')
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
                    product_img: JSON.parse(res.data).data
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
            header: {
                'Authorization': wx.getStorageSync('token')
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
                _this.data.product_detail_img.push(JSON.parse(res.data).data);
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
                total_quantity: this.data.total_quantity,
                original_price: this.data.original_price,
                present_price: this.data.present_price,
                category: this.data.category,
                product_img: this.data.product_img,
                product_detail_img: this.data.product_detail_img,
                start_date: this.data.start_date,
                expire_date: this.data.expire_date
            },
            success(res) {
                if(res.data.data.code == 1) {
                    wx.showToast({
                        title: '成功发布新优惠券',
                    })
                }
                else {
                    wx.showToast({
                        title: '发布失败',
                    })
                }
            }
    })
},


})
