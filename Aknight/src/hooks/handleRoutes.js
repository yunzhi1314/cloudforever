


export function handleRoutes(arr, index){
    // 递归
    if(index<0){
        return arr
    }else{
        arr[index].component = asyncComponent(arr[index].component)
        return handleRoutes(arr, index-1)
    }
}

function asyncComponent(path){
    return ()=>import(`@/views/${path}`)
}