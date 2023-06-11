import axios from "axios"

// 阿里云
export function sendCodes(tel,code){

    const req = axios({
        method:"POST",
        url:"https://dfsns.market.alicloudapi.com/data/send_sms",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded; charset=utf-8",
            "Authorization":"APPCODE eb5a9280ed75457aa593bb00fbcb30b4"
        },
        data:{
            content:"code:"+code,
            phone_number:tel,
            template_id:"CST_ptdie100"
        }
    })

    return req
}