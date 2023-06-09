export default {
    //数据库请求链接
    database: {
        //数据库主页布局（动态路由）
        layout: {
            menu: "/database/layout/menu"
        },
        // 主页homepage的echarts图表数据
        home: {
            messages: "/database/home/messages",
            expMedicals: "/database/home/expMedicals",
            basicMedical: "/database/home/basicMedical",
            navTools: "/database/home/navTools",
            naweiCompany: "/database/home/naweiCompany",
        },
        menu: {
            addMenu: "/database/menu/addMedical",
            setMenu: "/database/menu/setMedical",
            delMenu: "/database/menu/delMedical"
        },
        role: {
            addMenu: "/database/role/addMedical",
            delMenu: "/database/role/delMedical"
        },
        user: {
            queryMedicals: "database/home/expMedical"
        }
    }
}