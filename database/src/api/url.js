export default {
	centerPage: {
		// 个人中心图片
		centerImg: "api/personalCenter",
		// 获取验证码
		mathCode: "api/user/getCode",
		// 点击获取验证码发送短信
		telCode: "api/user/telCode",
		// 注册
		register: "api/user/register",
		// 登陆
		login: "api/user/login",
		// 验证码登陆
		codeLogin: "api/user/codeLogin",
		centerRoutes: "person/home",
		baseMsg: "person/baseMsg/userBasic",
		resetPsw: {
			code: "person/resetPsw/code",
			resetPsw: "person/resetPsw",
		},
		exchangeGift: {
			datas:"person/exchangeGift/getContext",
			getGift:'person/exchangeGift/getGift'
		},
		selfInquiries: "person/selfInquiries",
		personalList:{
			infoBasic:'person/personalList/infoBasic',
			infoRealname:'person/personalList/infoRealname',
			infoBehavior:'person/personalList/infoBehavior',
			infoDevice:'person/personalList/infoDevice',
		},
		shareList:'person/shareList',
	},
	database:{
		layout:{
			menu:'/database/layout/menu'
		},
		home:{
            messages:"/database/home/messages",
            expMedicals:"/database/home/expMedicals",
			basicMedical:'/database/home/basicMedical',
			navTools:'/database/home/navTools',
			naweiCompany:'/database/home/naweiCompany',
			naweiCompany2:'/database/home/naweiCompany2'
        },
		menu:{
			addMenu:"/database/menu/addMedical",
			setMenu:"/database/menu/setMedical",
            delMenu:"/database/menu/delMedical"
		},
		role:{
            addMenu:"/database/role/addMedical",
			setMenu:"/database/role/setMedical",
            delMenu:"/database/role/delMedical"
        },
		user:{
            queryMedicals:"database/home/expMedical",
			addMenu:"/database/user/addMedical",
			setMenu:"/database/user/setMedical",
            delMenu:"/database/user/delMedical"
        }
	}
};
