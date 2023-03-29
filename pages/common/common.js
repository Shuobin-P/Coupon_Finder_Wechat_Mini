import weappJwt from '../../utils/weapp-jwt.js'
function isMerchant() {
    let token = wx.getStorageSync('token');
    const payload = weappJwt(token);
    let temp = payload.isMerchant;
    return temp == true;
}

module.exports = {
    isMerchant: isMerchant
}