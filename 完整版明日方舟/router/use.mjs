import express from "express"
import { telCode,register,login,codeLogin} from "../router_handler/user.mjs"
import {getCode} from "../router_handler/user.mjs"
import arknight from "../static/arknights.mjs"
import expressjoi from "@escook/express-joi"
import { reg_register_schema , reg_passLogin_schema ,reg_codeLogin_schema} from "../schema/user.mjs"
import openai from "./openAi.mjs"

const router  = express.Router()

// openAI语言模型
router.use("/openai",openai)

// svg绘图工具及页面标题图标
router.get("/svgTool",(req,res)=>{
    res.send({status:0,svgs:arknight.icons,pageTitle:arknight.pageTitle})
})

// 静态主页图片
router.get("/index/imgs",(req,res)=>{
    res.send({status:0,img:arknight.index.imgs})
})

// 静态主页视频集合
router.get("/index/videoes",(req,res)=>{
    res.send({status:0,videos:arknight.index.videos,playBtn:arknight.index.playSvg})
})

// 静态主页下载集合
router.get("/index/downloads",(req,res)=>{
    res.send({status:0,herfs:arknight.index.downloadHerf,downloadBtn:arknight.index.downloadSvgsTemplate})
})

// 静态主页分享集合
router.get("/index/shows",(req,res)=>{
    var showArr = 
    [
      arknight.index.showSvgTemplate,
      arknight.index.showSvgTemplate2,
      arknight.index.showSvgTemplate3,
      arknight.index.showSvgTemplate4,
      arknight.index.showSvgTemplate5
    ]
    res.send({status:0,showBtns:showArr,showBtnSvg:arknight.index.showBtnSvg})
})

// 静态主页英文文字
router.get("/index/opacity",(req,res)=>{
    res.send({status:0,word:arknight.index.opacityWords})
})

// 个人中心的数据
router.get("/personalCenter",(req,res)=>{
    res.send({status:0,personal:arknight.personlCenter})
   
})


// 配置图形验证码
router.get('/user/getCode',getCode)


// 配置发放短信验证码的账号
router.post("/user/telCode",telCode)

// 配置注册账号和密码
router.post("/user/register",expressjoi(reg_register_schema),register)

// 配置密码登录
router.post("/user/login",expressjoi(reg_passLogin_schema),login)

// 配置短信登录
router.post("/user/codeLogin",expressjoi(reg_codeLogin_schema),codeLogin)

export default router