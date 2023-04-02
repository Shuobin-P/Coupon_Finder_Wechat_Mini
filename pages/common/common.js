import weappJwt from '../../utils/weapp-jwt.js'
function isMerchant() {
    let token = wx.getStorageSync('token');
    const payload = weappJwt(token);
    let temp = payload.isMerchant;
    return temp == true;
}


function js_date_time(unixtime) {
    var dateTime = new Date(parseInt(unixtime))
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法
    var milliseconds = now_new - dateTime;
    // var timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    var timeSpanStr = year + '-' + month + '-' + day;
    return timeSpanStr;
  }
  

module.exports = {
    isMerchant: isMerchant,
    js_date_time: js_date_time
}