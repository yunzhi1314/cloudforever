import url from '@/api/url'
import {reactive,onBeforeMount,toRefs} from 'vue'
import {Request} from '@/hooks/personalCenter/request'

import store from '@/store'

export  function exchangeData(){
    let dataList = reactive({
        datas:[]
    })
    
      onBeforeMount(()=>{
        Request.getData(url.personalCenter.exchangeGift.exchangeData)
        .then(res=>{
              dataList.datas = toRefs(reactive({...res.data.exchangeGift}))
              store.commit('personalCenter/changeContexts',res.data.context)
              store.commit("changeStore","isContext")
        })
      })
      return dataList
} 


export  function exchangeGiftData(data){
  let dataList = reactive({
      datas:[]
  })
     
        Request.postData(url.personalCenter.exchangeGift.exchangeGiftData,data)
        .then(res=>{
              dataList.datas = toRefs(reactive({...res.data}))
           
              store.commit("personalCenter/changeContexts",{item:res.data.items,...data})
              store.commit("changeStore","isContext")
        })
     
     
    return dataList
} 