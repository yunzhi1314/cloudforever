//将获取到的后端数据的路由信息处理成路由可以使用的格式
export function handlerRouter(routes, index) {
    if (index < 0) {
        return routes;
    } else {
        //将包括component属性的路由处理
        routes[index].component = asyncComponent(routes[index].component);
       if(!(routes[index].path.includes('/:userId'))){

       }
    }
}
//处理路由，将路由的component属性改为异步加载
function asyncComponent(p) {
    //处理路径，去掉开头的斜杠
    if (p[0] == '/') {
        p = p.slice(1);
    }
    return () => import(`@/views/${p}`);

}