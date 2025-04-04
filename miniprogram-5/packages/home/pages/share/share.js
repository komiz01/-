// packages/home/pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [
      
    ],
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
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 模拟从后端获取文章列表的数据请求
    wx.request({
      url: 'http://api.leonandor.com:8081/travel/post/page/list', // 获取文章列表的API地址
      method: 'GET',
      success: res => {
        // 假设返回的数据结构与预期一致
        this.setData({ articles: res.data });
      },
      fail: err => {
        console.error('获取文章列表失败', err);
        wx.showToast({
          title: '加载文章失败',
          icon: 'none'
        });
      }
    });
  },

  toDetail(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/articleDetail/articleDetail?id=${articleId}`
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
    // ------------------采用本地存储时
    // // 每次进入页面时从本地存储加载数据
    // const articles = wx.getStorageSync('articles') || [];
    // this.setData({ articles });
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