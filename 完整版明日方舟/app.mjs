import express,{json} from "express"
import cors from "cors"
import {expressjwt} from "express-jwt"
import config from "./config.mjs"
import useRouter from "./router/use.mjs"
import personRouter from "./router/userinfo.mjs"
import joi from "joi"
import session from "express-session"
import fileStore from 'session-file-store'
import databaseRouter from "./router/database.mjs"

const server = express()

// 解决跨域问题
server.use(cors())

// 额外添加跨域点
server.all("*", function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-requested-with,Authorization,token, content-type,Origin, Content-Type, Accept, t"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Content-Type", "xml/html;charset=utf-8");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Max-Age", "3600");
    next();
  });

  

// session相关配置
let identityKey = "codes"
const FileStore = fileStore(session)

server.use(session({
    name: identityKey,//存储在用户cookie中的key名
    secret: 'fullark',  // 用来对session id相关的cookie进行签名
    // store:new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000,  // 有效期，单位是毫秒
        sameSite:true,
        httpOnly:true,
        secure:false,
        signed:true
    },
}));




// 解析post请求
server.use(express.urlencoded({extended:false}))
server.use(json(),(req,res,next)=>{
    next()
})

// 使用.unless 指定哪些接口不需要进行token的身份认证
server.use(
    expressjwt({
        secret:config.jwtSecretKet,
        algorithms:["HS256"]
}).unless({
    path:[/^\/api\//]
})
)

// 相应数据的全局错误中间件封装
server.use((req,res,next)=>{
    // status = 0 成功 ; status = 1 失败，默认失败，方便传错
    res.cc = (err,status = 1)=>{
        res.send({
            status,
            // 返回对应的错误状态
            msg:err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 错误中间件
server.use((err,req,res,next) =>{
    res.cc = (err,status = 1)=>{
        res.send({
            status,
            // 返回对应的错误状态
            msg:err instanceof Error ? err.message : err,
        })
    }
    if(err instanceof joi.ValidationError) return res.cc(err);
    // 抛出身份认证失败的错误
    if(err.name === "UnauthorizedError") return res.cc("身份认证失败")
    // 抛出未知错误
    res.cc(err)
})

// 配置无需token的路径
server.use("/api",useRouter)

// 配置需要token的路径

// 明日方舟个人中心
server.use("/person",personRouter)
// 后台数据库
server.use("/database",databaseRouter)

server.listen(8090,()=>{
    console.log("server running at http://127.0.0.1:8090")
})

