// packages/user/pages/myArticle/myArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myArticles:[],
    test:[
      {
        id: 1,
        avatarUrl: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        nickname: '用户1',
        time:'20250222',
        title: '这是第一张卡片的标题',
        content: '这是第一张卡片的内容描述，可以包含多行文字。',
        ImageUrlList: [
          'https://tse4-mm.cn.bing.net/th/id/OIP-C.1X-3DSfzdN5DFboMQx2oRgHaHa?rs=1&pid=ImgDetMain',
          'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          'https://tse4-mm.cn.bing.net/th/id/OIP-C.1X-3DSfzdN5DFboMQx2oRgHaHa?rs=1&pid=ImgDetMain',
          'https://tse4-mm.cn.bing.net/th/id/OIP-C.1X-3DSfzdN5DFboMQx2oRgHaHa?rs=1&pid=ImgDetMain',
        ]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyArticles();
  },

  getMyArticles: function(){
    // 获取用户发布的文章列表
    wx.request({
      url: 'http://api.leonandor.com:8081/travel/post/page/list', // 替换为你的API地址
      method: 'GET',
      header:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + wx.getStorageSync('token') // 从本地存储中读取token
      },
      success: res => {
        this.setData({
          myArticles: res.data
        });
      }
    });
  },

  toDetail(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/packages/home/pages/myArticle/myDetail/myDetail?id=${articleId}`
    });
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})