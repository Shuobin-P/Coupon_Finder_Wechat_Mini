
function isMerchant() {
    let token = wx.getStorageSync('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    let temp = payload.isMerchant;
    return temp == true;
}

module.exports = {
    isMerchant: isMerchant
}