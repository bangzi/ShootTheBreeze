var app = getApp()

Page({
    data: {
        detailArr: [],
    },
    onShow: function () {
        // 生命周期函数--监听页面显示
      var that=this;
        wx.request({

            url: app.globalData.globalUrl + "listuser",
            data: {

            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                // success

                // that.setData{
                //     detailArr = res.data;
                // }
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete
            }
        })
     },

})