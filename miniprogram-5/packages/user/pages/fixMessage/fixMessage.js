// pages/user/fixMessage/fixMessage.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{

    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      "userInfo.avatar": avatarUrl,
    })
  },

  onInputChange(e) {
    const nickName = e.detail.value
    this.setData({
      "userInfo.nickname": nickName,
    })
  },

  onInputChangeMotto(e) {
    const motto = e.detail.value
    this.setData({
      "userInfo.motto": motto,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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