// packages/user/pages/myArticle/myDetail/myDetail.js

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
        // 添加更多图片链接
      ],
      
    },
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  previewImage(e) {
    const imageUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      current: imageUrl, // 当前显示图片的http链接
      urls: this.data.article.ImageUrlList // 需要预览的图片http链接列表
    });
  },

  showOptions() {
    const that = this;
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success(res) {
        if (res.tapIndex === 0) {
          // 编辑逻辑
          console.log('编辑文章');
          // 可以跳转到编辑页面或者直接在当前页面进行编辑操作
          wx.navigateTo({
            url: './editArcitle/editArticle',
          })
        } else if (res.tapIndex === 1) {
          // 删除逻辑
          that.deleteArticle();
          
        }
      },
      fail(res) {
        console.log("取消选择");
      }
    })
  },

  deleteArticle() {
    // 显示确认对话框
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这篇文章吗？',
      success(res) {
        if (res.confirm) {
          // 调用删除文章的接口
          wx.request({
            url: `http://api.leonandor.com:8081/travel/post/delete/${articleId}`,
            method: 'DELETE',
            header: {
              'Authorization': 'Bearer ' + wx.getStorageSync('token') // 假设token存储在本地缓存中
            },
            success(res) {
              console.log('删除成功');
              // 成功后可以刷新页面或跳转到其他页面
              wx.reLaunch({
                url: '/pages/myArticle/myArticle'
              });
            },
            fail(err) {
              console.error('删除失败', err);
            }
          });
        }
      }
    });
  },

  
})