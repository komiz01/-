// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求，将code发送到你的服务器
          wx.request({
            url: 'http://api.leonandor.com:8081/travel/login', // 替换成你的服务器地址
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code
            },
            success: loginRes => {
              console.log('登录成功', loginRes);
              if (loginRes.data && loginRes.data.token) {
                const token = loginRes.data.token;
                // 保存 token 到本地存储
                wx.setStorageSync('token', token);
                console.log('Token 已保存:', token);
              } else {
                console.error('登录成功但未获取到 token');
              }
            },
            fail: err => {
              console.error('登录失败', err);
            }
          });
        } else {
          console.error('登录失败！' + res.errMsg);
        }
      }
    });
  },

  globalData: {
    userInfo: {
      avatar:'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      nickname:'未登录',
      motto:'个性签名'
    }
  },

//-----------------------------------------
  getUserOpenId: function(callback) {
    var self = this
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
         wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }

})
