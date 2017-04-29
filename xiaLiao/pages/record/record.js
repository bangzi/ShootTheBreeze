var app = getApp()

Page({
  data:{
   recordResult:[],
   isRecord:false,
   
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  
  },
 recordStart :function(){
  //录音动画
   speaking.call(this);
    this.setData({
      isRecord: true
    })
  //录音
  wx.startRecord({
    success: function(res){
      // success
       var tempFilePath = res.tempFilePath;
       //发送请求，存到网络
       wx.request({
         url: ' ',
         data: {},
         method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         // header: {}, // 设置请求的 header
         success: function(res){
           // success
         },
         fail: function(res) {
           // fail
         }
       })
    },
    fail: function(res) {
      // fail
    },
  })
 },
 
 recordStop:function(){
   var that = this;
   that.setData({
     isRecord:false
   })
   wx.stopRecord()
   
 }

})

//录音动画
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
  }, 200);
}