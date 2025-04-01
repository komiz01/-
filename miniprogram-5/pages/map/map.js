// pages/map/map.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'MIXBZ-WLJE3-TVI35-OS5HN-K666Z-PZFUW' // 必填
});

Page({  
  data: { 
    latitude: 23.412840,  
    longitude: 116.633490,  
    markers: [],  
    
    dragPosition: 0, // 拖动窗口的初始位置
    startY: 0 ,// 触摸开始时的Y坐标
    initialDragPosition: 0, // 记录拖动开始时的初始位置+

    tabList: [
      {
        id: '1',
          title: '公共交通',
          src:'../../icon/大巴.png',
          url:''
      },
      {
        id: '2',
          title: '动车',
          src:'../../icon/动车.png',
          url:''
      },
      {
        id: '3',
          title: '景点',
          src:'../../icon/景点.png',
          url:''
      },
      {
        id: '4',
          title: '日程安排',
          src:'../../icon/日历.png',
          url:''
      },
      {
        id: '5',
          title: '酒店',
          src:'../../icon/酒店.png',
          url:''
      },
      {
        id: '6',
          title: '美食',
          src:'../../icon/夏日饮品.png',
          url:''
      },
      {
        id: '7',
          title: '购物',
          src:'../../icon/购物.png',
          url:''
      },
      {
        id: '8',
          title: '更多',
          src:'../../icon/泳圈.png',
          url:''
      }
    ],
    
    
  },  
    
  onLoad() {  
    this.getLocation();
//--------------------------------
    const systemInfo = wx.getSystemInfoSync();
    const windowHeight = systemInfo.windowHeight; // 获取当前设备的窗口高度
    this.setData({
    dragPosition: windowHeight - 100, // 让窗口初始位置在距离底部100px的位置
    initialDragPosition: windowHeight - 100 // 初始化初始位置+
  });
    
  },  
//--------------------------------获取位置 
  getLocation: function () {  
    const that = this;  
    wx.getLocation({  
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度  
      success: function (res) {  
        that.setData({  
          latitude: res.latitude,  
          longitude: res.longitude,  
          markers: [{  
            id: 1,  
            latitude: res.latitude,  
            longitude: res.longitude,  
            width: 50,  
            height: 50,  
            iconPath: '/resources/location.png' // 可选：自定义标记图标  
          }]  
        });  
      },  
      fail: function (error) {  
        console.error("获取位置失败：" + error.errMsg);  
        wx.showToast({  
          title: '获取位置失败',  
          icon: 'none'  
        });  
      }  
    });  
  },
  
//--------------------------------- 

touchStart(e) {
  this.setData({
    startY: e.touches[0].clientY,
    initialDragPosition: this.data.dragPosition // 更新初始拖动位置+
  });
},

touchMove(e) {
  const moveY = e.touches[0].clientY;
  const deltaY = this.data.startY - moveY;

   // 如果尝试向下拖动并且窗口已经在顶部，则不允许继续向下拖动以避免触发下拉刷新
  if (deltaY > 0 && this.data.initialDragPosition <= 0) {
      return;
  }

    // 计算新的位置，并确保它在有效范围内
  let newDragPosition = this.data.initialDragPosition - deltaY;
  newDragPosition = Math.max(0, Math.min(newDragPosition, /* 这里设置最大拖动边界，例如windowHeight-窗口自身高度 */));

  this.setData({
      dragPosition: newDragPosition,
      initialDragPosition: newDragPosition // 更新初始拖动位置，以便连续拖动+
  });
  // const deltaY =  this.data.startY -e.touches[0].clientY ;
  // // 更新拖动窗体的位置
  // this.setData({
  //   dragPosition: Math.max(0, this.data.dragPosition - deltaY) // 限制最小值为0
  // });
  // // 更新起始Y坐标为当前Y坐标
  // this.setData({
  //   startY: e.touches[0].clientY
  // });
},

touchEnd() {
  // 在此可以处理释放后的逻辑，例如增加弹性效果
  const windowHeight = wx.getSystemInfoSync().windowHeight;
  const fixedPositions = [0, windowHeight - 100]; // 示例：顶部和距离底部100px处

  let closestPosition = fixedPositions[0];
  let minDistance = Math.abs(this.data.dragPosition - closestPosition);

  for (let i = 1; i < fixedPositions.length; i++) {
      const distance = Math.abs(this.data.dragPosition - fixedPositions[i]);
      if (distance < minDistance) {
          minDistance = distance;
          closestPosition = fixedPositions[i];
      }
    }

    // 使用动画平滑过渡到最近的位置
  this.setData({
      dragPosition: closestPosition
  });
}

});