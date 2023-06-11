import md5 from "blueimp-md5"
import moment from "moment"
import {Base64} from "js-base64"
import request from "request"

/*
 生成指定长度的随机数
 */
export function randomCode(length) {
    // 单个数字 0-9
    let chars = ['0','1','2','3','4','5','6','7','8','9'];
    let result = ""; //统一改名: alt + shift + R
    for(let i = 0; i < length ; i ++) {
        let index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}

/*
向指定号码发送指定验证码
 */
// 云通讯
export function sendCode(phone, code, callback) {
    var ACCOUNT_SID = '2c94811c87c2d4870187d166309301ec';
    var AUTH_TOKEN = 'ba3e9e06e24c493383ede7e55fa60813';
    var Rest_URL = `https://app.cloopen.com:8883`;
    var AppID = '2c94811c87c2d4870187d16631da01f3';
    //1. 准备请求url
    /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
    var sigParameter = '';
    var time = moment().format('YYYYMMDDHHmmss');  // 2023-05-01 23:59:59
    sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
    var url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;

    //2. 准备请求体
    var body = {
        to : phone,
        appId : AppID,
        templateId : '1',
        "datas":[code,"1"]
    }
    //body = JSON.stringify(body);

    //3. 准备请求头
    /*
     1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
     2.冒号为英文冒号
     3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
     */
    var authorization = ACCOUNT_SID + ':' + time;
    authorization = Base64.encode(authorization);
    var headers = {
        'Accept' :'application/json',
        'Content-Type' :'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(body).length+'',
        'Authorization' : authorization
    }
    console.log({
        method : 'POST',
        url : url,
        headers : headers,
        body : body,
        json : true
    })
    //4. 发送请求, 并得到返回的结果, 调用callback
	  // callback(true);
    request({
        method : 'POST',
        url : url,
        headers : headers,
        body : body,
        json : true
    }, function (error, response, body) {
        console.log(body)
        callback(body.statusCode==='000000');
    });

}