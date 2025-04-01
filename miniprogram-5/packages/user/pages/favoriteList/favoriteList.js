// packages/user/pages/favoriteList/favoriteList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favoriteArticles: [], // 存储收藏的文章列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getFavoriteArticles();
  },

  getFavoriteArticles: function() {
    // 获取用户收藏的文章列表
    wx.request({
      url: 'http://api.leonandor.com:8081/user/start/list', // 替换为你的API地址
      method: 'GET',
      header:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + wx.getStorageSync('token') // 从本地存储中读取token
      },
      success: res => {
        this.setData({
          favoriteArticles: res.data
        });
      }
    });
  },

  toDetail(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/packages/home/pages/articleDetail/articleDetail?id=${articleId}`
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