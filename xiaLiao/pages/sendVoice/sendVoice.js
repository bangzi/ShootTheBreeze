var common = require('../../utils/common.js').userInfo()
var app = getApp()

Page({
  data:{
    tempFilePath:''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
   
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },

  //点击录音
  clickEventHandle: function () {
      var that = this;
      wx.startRecord({
          success: function (res) {
            //   var tempFilePath = res.tempFilePath;
            console.log('录音的结果路径：', res.tempFilePath);
              that.setData ({
                   tempFilePath: res.tempFilePath
              })
          },
          fail: function (res) {
              //录音失败
          }
      })
  },
  
  //点击播放录音
  clickEventHandlePlayVoice: function() {
      console.log('录音的结果路径：', this.data.tempFilePath);
      wx.playVoice({
          filePath: this.data.tempFilePath,
          complete: function () {
          }
      })
  },

  //点击取消录音
  clickEventHandleStopVoice: function() {
      //结束录音  
      wx.stopRecord()
  }

})