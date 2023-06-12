export function dealRoutes(routes,index){
  
    if(index<0){
        return routes
    }else{
        routes[index].component = asyncComponent(routes[index].component)
        
        if(!(routes[index].path.includes('/:userId'))){
           routes[index].path = routes[index].path.slice(1) + '/:userId'
           routes[index].path = routes[index].path.slice(routes[index].path.indexOf('/')+1)
        }
        if(routes[index].children && routes[index].children.length>0){
            routes[index].children = routes[index].children.map((item)=>{
                asyncComponent(item.component);
                if(!(item.path.includes('/:userId'))){
                    item.path = item.path.slice(1) + '/:userId'
                    item.path = item.path.slice(item.path.indexOf('/')+1)
                }
                return item;
                
            })
        }
        return dealRoutes(routes,index - 1)
    }
    
}

function asyncComponent(path){
    
    if(path[0] == '/'){
        path = path.slice(1)
    }
    return ()=>import(`@/views/${path}`)
}


