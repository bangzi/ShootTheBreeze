var common = require('../../utils/common.js').userInfo()
var app = getApp()

Page({
  data:{
    tempFilePath:'',
    voiceWidth: 0,
    voiceSecond: 0,
    voiceViewWidth: 0,
    playStatus:false,
    j:1,
    speakingTimer: null,
    readingTimer: null,
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

  //长按录音
  clickEventHandleStartVoice: function (e) {
      var that = this;
      var intervarID;
      var count = 0;

      //开始录音时，关闭正在播放的录音
      clearInterval(this.data.readingTimer);
      wx.stopVoice({
          complete: function (res) {
              // complete
              that.setData({
                  playStatus: false
              })
          }
      })

      speaking.call(this);
      intervarID = setInterval(function () {
          console.log('一秒执行一次', count);
          count++;
      }, 1000);

      wx.startRecord({
          success: function (res) {
              //   var tempFilePath = res.tempFilePath;
              clearInterval(intervarID);
              console.log('录音的结果路径：', res);
              console.log('最后count值：', count);
              that.setData({
                  tempFilePath: res.tempFilePath,
                  voiceWidth: (8 * count - count * count * 0.0667),
                  voiceViewWidth: (8 * count - count * count * 0.0667 + 20),
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
          }
      })
  },

//松手结束录音
  clickEventHandleStopVoice: function () {
      wx.stopRecord();
      console.log('停止录音', this.data.speakingTimer);
      clearInterval(this.data.speakingTimer);
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

/**
 * 开始录音动画定时器
 */
function speaking() {
    var that = this;
    //话筒帧动画
    var i = 1;
    var timer;
    timer = setInterval(function () {
        console.log('开始录音动画定时地址', timer);
        i++;
        i = i % 5;
        that.setData({
            j: i,
            speakingTimer: timer
        })
        // console.log('speakingTimer: i=', i);
    }, 200)
}

/**
 * 播放录音动画定时器
 */
function reading() {
    var that = this;
    //话筒帧动画
    var i = 0;
    var count = 0;
    var voiceTime = this.data.voiceSecond * 1000;
    var currentVoiceTime;
    var timer = setInterval(function () {
        console.log('开始播放录音动画定时地址', timer);
        i = i % 5;
        i++;
        that.setData({
            j: i,
            readingTimer: timer
        })
        //关闭播放定时器
        currentVoiceTime = count * 200;
        count++;
        if(voiceTime < currentVoiceTime) {
            clearInterval(timer),
            that.setData({
               playStatus:false
            })
            console.log('关闭播放定时器', timer);
        }

    }, 200)
}