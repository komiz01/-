Page({
	/**
	 * 页面的初始数据
	 */
	data: {
			cover:'',
			viewHeight: 640, // 默认高度
			navIndex: 0,
			tabList: [{
					id: '1',
							title: '旅游分享',
							src:'../../icon/笨游黄页.png',
							url:''
					},
					{
						id: '2',
							title: '景点推荐',
							src:'../../icon/旅游景点.png',
							url:''
					},
					{
						id: '3',
							title: '我的足迹',
							src:'../../icon/旅游攻略.png',
							url:''
					}
			],

			articleList: [{
							title:'小公园',
							content: '汕头小公园，集历史风情与现代休闲于一体，是老市区的标志性景点，以其独特的骑楼建筑和人文底蕴吸引着众多游客。',
							src: 'https://dimg04.c-ctrip.com/images/0104z120009x7hlje2A78.webp'							
					},
					{
							title:'南澳岛',
							content: '南澳岛，广东汕头海岛县，全岛域国家4A级旅游景区，被誉为“东方夏威夷”，风景秀丽。',
							src: 'https://ts1.cn.mm.bing.net/th/id/R-C.26192686a89ee6770cbf4c63773a7502?rik=v6rYJiyXk1ygTA&riu=http%3a%2f%2fpic1.k1u.com%2fk1u%2fmb%2fd%2ffile%2f20220427%2f1651021801717483_836_10000.jpg&ehk=1bSggB0cJolSDnM2Qho8%2fMCAkyLbUl39XIF3IMpnR7U%3d&risl=&pid=ImgRaw&r=0'
					},
					{
							title:'潮汕历史文化博览中心',
							content: '潮汕历史文化博览中心，汇聚潮汕文化精髓，集展览、研究、交流于一体，是了解潮汕文化的绝佳窗口。',
							src: 'https://pic.vjshi.com/2022-05-10/7e4154c288024557af381d994318860e/00002.jpg?x-oss-process=style/watermark'	
					},
			]
	},


	// 滑动监听
	moduleSelect(e){
			this.setData({
					navIndex:e.detail.current
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
			var that = this;
			wx.getSystemInfo({
					success(res) {
							that.setData({
									viewHeight:res.windowHeight
							})
					}
			})
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
