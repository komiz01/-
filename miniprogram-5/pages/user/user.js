// pages/user/user.js
const app= getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
    }
  },

//点击头像跳转页面
  onTap(){
    wx.navigateTo({
      url: '../../packages/user/pages/fixMessage/fixMessage',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //获取全局变量
    const userInfo = app.globalData.userInfo;
    //更新页面数据
    this.setData({
      userInfo: userInfo
    })
  },
  


  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const userInfo= app.globalData.userInfo;
    this.setData({
      userInfo: userInfo
    })
  },


})