import url from "@/api/url";
import {reactive,toRef} from 'vue'
import { Request } from "@/hook/request";
import { dealRoutes } from "@/hook/handlerRouter";
import router from '@/router'
import store from '@/store'

export function centerMenu(){
    let dataList = reactive({
        menus:[]
    });

    Request.get(url.personalCenter.centerRoutes)
    .then((res)=>{
        // 将我们获取到的响应式基本数据转化为一个响应式数据
        dataList.menus = toRef({...res.data})       
        // 处理动态路由，并且在缓存页面中2秒后执行页面跳转
        if(dataList.menus.status == '0'){
            let {nav,loginOut,navSvg} = dataList.menus.datas         
            let menuMsg = nav.map(item=>{
                let {route, ...obj} = item
                Reflect.get(route,'path')
                return obj
            })

            // 将处理完的菜单信息页面和页面其他信息合并
            menuMsg = {menuMsg,loginOut,navSvg}
         
            store.commit('personalCenter/changeBaseMessage',menuMsg)
            // 存储路由信息
            let routes = nav.map(item=>item.route)
            store.commit('personalCenter/changeBaseRoutes',routes)
            store.commit('CHANGE_STORE','isBaseMessage')

            // 处理component数据，将路由正规化
            routes = dealRoutes(routes,routes.length-1)

            //增加路由，将个人中心的子路由添加到父路由(centerPage)中去
            routes.forEach(item => {
                router.addRoute('centerPage',item)
            })

            let userId = reactive(JSON.parse(localStorage.getItem('users'))).userId
            // 定时2秒后跳转到对应的页面
            setTimeout(()=>{
                router.push({
                    name:'BaseMessage',
                    params:{
                        userId
                    }
                });
            },2000);

        }
    });
    
    // 抛出响应数据
    return dataList
}