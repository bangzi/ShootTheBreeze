var common = require('../../utils/common.js').userInfo()
var app = getApp()

Page({
  data:{
    tempFilePath:'',
    recordStatus: false,
    voiceWidth: 0,
    voiceSecond: 0,
    voiceViewWidth: 0,
    playStatus:false,
    j:1,
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
  clickEventHandleStartVoice: function (e) {
      var that = this;
      var intervarID;
      var count = 0;
      console.log(e);
       speaking.call(this);
      if(e.currentTarget.id == 0) {
          intervarID = setInterval(function () {
              console.log('一秒执行一次', count);
              count++;
          }, 1000);
          that.setData({
              recordStatus: true,
          })
          wx.startRecord({
              success: function (res) {
                  //   var tempFilePath = res.tempFilePath;
                  clearInterval(intervarID);
                  console.log('录音的结果路径：', res);
                  console.log('最后count值：', count);
                  that.setData({
                      tempFilePath: res.tempFilePath,
                      voiceWidth: (count * 200 / 60),
                      voiceViewWidth: (count * 200 / 60 + 20),
                      voiceSecond: count,
                  })
              },
              fail: function (res) {
                  //录音失败
                  clearInterval(intervarID);
                  wx.showLoading({
                      title: '录音失败',
                  })
                  setTimeout(function () {
                      wx.hideLoading()
                  }, 1500)
                  that.setData({
                      recordStatus: false
                  })
              }
          })
      }else {
          wx.stopRecord();
          that.setData({
              recordStatus: false,
          })
      }

  },
  
  //点击播放录音
  clickEventHandlePlayVoice: function() {
      console.log('录音的结果路径：', this.data.tempFilePath);
      
      reading.call(this);
      this.setData({
          playStatus:true
      })

      wx.playVoice({
          filePath: this.data.tempFilePath,
          complete: function () {
          }
      })
  },

  //取消发表
  cancelButtonEventHandle: function(e) {
      var that = this;
      wx.stopVoice();
      that.setData ({
          tempFilePath: '',
          voiceWidth: 0,
          voiceViewWidth: 0,
          voiceSecond: 0,
      })
  },
 
  //发表
  publishButtonEventHandle: function(e) {
      var that = this;
      wx.stopVoice();
  }

})

function speaking() {
  var that = this;
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    that.setData({
      j: i
    })
  }, 200)
  }
  function reading() {
  var that = this;
  //话筒帧动画
  var i = 0;
  this.timer = setInterval(function () {
   
    i = i % 5;
     i++;
    // that.setData({
    //   j: i
    // })
  }, 200)
  }