import { Request } from "@/hooks/request";
import type { URL } from '@/namespace/animation'
import { toRef } from 'vue'
import url from '@/api/url'

export async function getIndexDatas(prop:string){
    let API = Reflect.get(<URL.urlObj>url.index,prop)
    const datas =  toRef(await Request.getData(API)).value.data

    return datas
}