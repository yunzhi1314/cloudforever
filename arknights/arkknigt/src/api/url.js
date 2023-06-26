export default {
    // 个人中心
    personalCenter: {
        centerImg: "api/personalCenter",//整体内容（centerPage页面）的请求路劲
        mathCode: 'api/user/getCode',//获取验证码按钮的请求路劲
        telCode: 'api/user/telCode',//短信验证码的请求路劲
        register: 'api/user/register',//注册按钮的请求路劲
        login: "api/user/login",//登录按钮的请求路劲
        codeLogin: 'api/user/codeLogin',//验证码登录的等登录按钮的请求路劲
        centerRoutes: 'person/home',
        baseMsg:'person/baseMsg/userBasic',//个人信息baseMessage页面的数据请求路劲
    },
    //数据库url
    database: {
        layout: {
            menu: "/database/layout/menu"
        },
        home: {
            messages: "/database/home/messages",
            expMedicals: "/database/home/expMedicals",
            basicMedical: "/database/home/basicMedical",
            navTools: "/database/home/navTools",
            naweiCompany: "/database/home/naweiCompany",
        },
        menu: {
            addMenu: "/database/menu/addMedical",
            setMenu:"/database/menu/setMedical",
            delMenu: "/database/menu/delMedical"
        },
        role: {
            addMenu: "/database/role/addMedical",
            delMenu: "/database/role/delMedical",
            setMenu:"/database/role/setMedical",
        },
        user: {
            queryMedicals: "database/home/expMedical"
        }
    }
}