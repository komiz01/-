// pages/article/article.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:'',
    headImg: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  bindTitleInput(e) {
    this.setData({ title: e.detail.value });
  },
  bindContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  //选择图片
  chooseImage:function(){
    wx.chooseImage({
      count: 9, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=>{
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          headImg: this.data.headImg.concat(tempFilePaths)
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

  //预览图片
  previewImg:function(e){
    const img = e.currentTarget.dataset.img;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: this.data.headImg, // 需要预览的图片http链接列表
      success: () => {

      },
      fail: () => {
        util.showModel('预览图片失败', '请稍后重试');
      }
    })
  },

  removeImage:function(e) {
    const img = e.currentTarget.dataset.img;
    let temArr = this.data.headImg.slice();
    for(let i=0;i<temArr.length;i++){
      if(temArr[i]===img){
        temArr.splice(i,1);
        break;
      }
    };
    this.setData({
      headImg:temArr
    })
  },


// //------------------采取本地存储
//   submitPost() {
//     const article = {
//       id: Date.now(), // 用时间戳模拟唯一ID
//       title: this.data.title,
//       content: this.data.content,
//       headImg: this.data.headImg,
//       avatarUrl: this.data.avatarUrl,
//       nickname: this.data.nickname,
//       time: new Date().toLocaleString()
//     };

//     wx.showToast({
//       title: '发布成功',
//     })
    
//     // 从本地存储获取已有文章列表
//     const articles = wx.getStorageSync('articles') || [];
//     articles.unshift(article); // 添加到列表头部
//     wx.setStorageSync('articles', articles);

//     // 跳转到列表页
//     wx.switchTab({
//       url: '../../packages/home/pages/share/share'
//     });
//   },

//-----------------------联通后端后的存储
  submitPost(){
    const { title, content, headImg } = this.data;
    if (!title || !content ) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    // 上传所有图片到服务器并获取图片URL

    let uploadedImagesCount = 0;
    const imageUrlList = [];

    if(headImg.length == 0){
      this.submitArticle(title,content,imageUrlList);
    }

    for (let i = 0; i < headImg.length; i++) {
      wx.uploadFile({
        url: '', // 替换为你的服务器地址
        filePath: headImg[i],
        name: 'file',
        formData: {
          'user': 'test_user' // 其他额外参数
        },
        success(res){
          const data = JSON.parse(res.data); // 服务器返回的数据
          imageUrlList.push(data.url); 
          uploadedImagesCount++;
          if (uploadedImagesCount === headImg.length) {
            // 所有图片都上传完成后，发布文章
            that.submitArticle(title, content, imageUrlList);
          }
        },
        fail(error) {
          console.error('图片上传失败', error);
          wx.showToast({
            title: '图片上传失败，请重试',
            icon: 'none'
          });
        }
      });
    }
  },
  submitArticle(title, content, imageUrlList) {
    wx.request({
      url: 'http://api.leonandor.com:8081/travel/post/create', // 替换为你的API地址
      method: 'POST',
      header:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + wx.getStorageSync('token') // 从本地存储中读取token
      },
      data: {
        title: title,
        content: content,
        imageUrlList: imageUrlList // 发送所有图片的url列表
      },
      success(res) {
        wx.showToast({
          title: '文章发布成功',
          icon: 'success'
        });
        // 清空表单或跳转页面等操作
      },
      fail(error) {
        console.error('发布失败', error);
        wx.showToast({
          title: '文章发布失败',
          icon: 'none'
        });
      }
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },


})