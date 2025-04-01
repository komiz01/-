// packages/user/pages/myArticle/myDetail/editArcitle/editArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      avatarUrl: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      nickname: 'user1',
      time: '2-25 22:03',
      title: '标题',
      content: '正文内容,的撒旦比我好看我不烦敖德萨分库分表我呢融合布局空单啊西安科技五年我爱北京出口成章你这边客服',
      ImageUrlList: [
        'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        'https://tse4-mm.cn.bing.net/th/id/OIP-C.1X-3DSfzdN5DFboMQx2oRgHaHa?rs=1&pid=ImgDetMain',
        'https://tse4-mm.cn.bing.net/th/id/OIP-C.1X-3DSfzdN5DFboMQx2oRgHaHa?rs=1&pid=ImgDetMain',
        'https://pic.vjshi.com/2022-05-10/7e4154c288024557af381d994318860e/00002.jpg?x-oss-process=style/watermark',
        // 添加更多图片链接
      ],
      
    },
  },

  saveArticle:function () {
    
  },

  onTitleInput: function(e) {
    this.setData({ title: e.detail.value });
  },
  
  onContentInput: function(e) {
    this.setData({ content: e.detail.value });
  },

  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    let imageUrlList = this.data.article.ImageUrlList;
    imageUrlList.splice(index, 1); // 从列表中移除图片
    this.setData({
      'article.ImageUrlList': imageUrlList
    });
  },

  chooseImage:function(){
    wx.chooseImage({
      count: 9, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=>{
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          ImageUrlList: this.data.ImageUrlList.concat(tempFilePaths)
        })
      },
      fail:()=>{
        wx.showToast({
          title: '上传图片失败',
          icon: 'error'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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