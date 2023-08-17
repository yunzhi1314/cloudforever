// 请求的数据
import req from '@/utils/request'

//请求数据，里面的接口
import { List, Method } from '@/utils/require'

//引入仓库
import store from '@/store'
//开关
import offno from '@/login/isno'

//引入路由
import router from '@/router'




//吐死函数
function Toest(fulfilled: string, reject: string, message?: string) {

    //开启吐司
    offno.tusi = true


    //提示用户的提示词
    let isno = message
    isno == fulfilled
        ? store.commit('setTusi', fulfilled) :
        store.commit('setTusi', reject)

    //延迟动画吐司
    setTimeout(() => {
        offno.tusi = false
    }, 2000)
}



//带请求的吐司
export function message(
    fulfilled: string,
    reject: string,
    url?: string,
    method?: keyof Method,
    data?: List,
) {
    if (typeof url != "undefined" &&
        typeof method != "undefined" &&
        typeof data != "undefined") {
        req[method](url, data).then((res: any) => {
            Toest(fulfilled, reject, res.data.message)

            //点击登录时，通过token判断有没有登录成功
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.userId)


                //跳转页面
                router.push({
                    name: 'indata',
                    params: {
                        userId: res.data.userId
                    }
                })
            }
        })
    } else {
        Toest(fulfilled, reject)
    }

}
