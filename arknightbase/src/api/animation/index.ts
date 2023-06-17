import { Request } from '@/hooks/request'
import { toRef } from 'vue'
import url from '@/api/url'
import type { URL } from '@/namespace/animation'

export async function getIndexDatas(propKey: string) {
  // 获取后台API
  let API = Reflect.get(<URL.urlObj>url.index, propKey)
  // 获取后台数据(不能返回axios对象，否则会类型报错)
  let datas = toRef(await Request.getData(API)).value.data
  return datas
}
