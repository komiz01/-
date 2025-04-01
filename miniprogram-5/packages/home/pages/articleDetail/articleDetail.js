// packages/home/pages/articleDetail/articleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      
    },
    test:{
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
        // 添加更多图片链接
      ],
    },
    isCollected: false,

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const articleId = options.id; // 假设通过id参数获取文章
    this.getArticleDetail(articleId);
  },

  getArticleDetail(articleId) {
    // 调用API获取文章详情
    wx.request({
      url: `http://api.leonandor.com:8081/travel/post/show/${articleId}`, // 使用模板字符串替换占位符 :id
      method: 'GET',
      success: res => {
        const articleData = res.data;
        this.setData({
          article: articleData,
          isCollected: articleData.isCollected || false,
        });
      },
      fail: err => {
        wx.showToast({
          title: '获取文章详情失败',
          icon: 'none'
        });
      }
    });
  },

  toggleCollect() {
    const { article, isCollected } = this.data;
    let url = '';
    let method = '';

    if (!isCollected) {
        // 如果没有被收藏，则调用添加收藏接口
        url = 'http://api.leonandor.com:8081/user/start/add/' + article.id;
        method = 'POST';
    } else {
        // 如果已经被收藏，则调用删除收藏接口
        url = 'http://api.leonandor.com:8081/user/start/remove/' + article.id;
        method = 'DELETE';
    }

    wx.request({
      url: url,
      method: method,
      header:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + wx.getStorageSync('token') // 从本地存储中读取token
      },
      success: () => {
        // 切换收藏状态并更新到data中
        this.setData({ isCollected: !isCollected });
        // 显示操作结果给用户
        wx.showToast({
          title: isCollected ? '取消收藏成功' : '收藏成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        // 操作失败时显示错误提示
        wx.showToast({
          title: '操作失败',
          icon: 'none'
        });
      }
    });
  },

  previewImage(e) {
    const imageUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      current: imageUrl, // 当前显示图片的http链接
      urls: this.data.article.ImageUrlList // 需要预览的图片http链接列表
    });
  },


})