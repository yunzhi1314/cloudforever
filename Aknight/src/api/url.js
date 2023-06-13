//各个页面的请求路径
export default {
	//个人中心页面
	centerPage: {
		centerImg: "api/personalCenter", //个人中心图片
		mathCode: "api/user/getCode",//获取验证码图片
		telCode: "api/user/telCode",//发送短信
		register: "api/user/register",//注册请求
		login: "api/user/login",//登录请求
		centerRoutes: "person/home",//个人中心主页图片及路由信息
		baseMsg: {//个人信息页面
			getBaseMsg: "person/baseMsg/userBasic",//获取页面信息
			telephone: "person/baseMsg/telephone",//更改手机号
			email: "person/baseMsg/email",//更改邮箱
			nickName: "person/baseMsg/nickName",//更改昵称
			idNumber: "person/baseMsg/idNumber",//更改实名认证
		},
		resetPsw: {//重置密码页面
			resetPsw: "person/resetPsw",//更改密码
			code: "person/resetPsw/code",//发短信
		},
		exchangeGift: {//礼包兑换页面
			datas: "person/exchangeGift/getContext",//获取兑换码
			getGift: "person/exchangeGift/getGift",//兑换
		},
		selfQuery: {//自助查询页面
			selfInquiries: "person/selfInquiries",//获取页面信息
		},
		personalList: {//个人信息清单页面
			infoBasic: "person/personalList/infoBasic",//个人基本信息
			infoRealname: "person/personalList/infoRealname",//实名信息
			infoBehavior: "person/personalList/infoBehavior",//用户行为信息
			infoDevice: "person/personalList/infoDevice",//设备属性及定位信息
		},
		thirdShare: "person/shareList",//第三方共享个人清单
	},
	//数据库
	database: {
		layout: {//布局,获取路由和基本信息
			menu: "/database/layout/menu",
		},
		home: {
			messages: "/database/home/messages",
			expMedicals: "/database/home/expMedicals",
			basicMedical: "/database/home/basicMedical",
			navTools: "/database/home/navTools",
			naweiCompany: "/database/home/naweiCompany",
		},
	},
};
