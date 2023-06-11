import express from "express"
import {home} from "../router_handler/userinfo.mjs"
import baseMsg from "../router_handler/basemsg/basemsg.mjs"
import { resetPsw ,getPswCode} from "../router_handler/resetPsw/resetpsw.mjs"
import { reg_password_schema } from "../schema/user.mjs"
import expressJoi from "@escook/express-joi"
import exchangeGift from "../router_handler/exchangeGift/exchangeGift.mjs"
import personalList from "../router_handler/personalList/index.mjs"
import {shareList} from "../router_handler/shareList/index.mjs"

const router = express.Router()

// 获取主页图片及路由信息
router.get("/home",home)
// 基本信息
router.use("/baseMsg",baseMsg)
// 重置密码
router.put("/resetPsw",expressJoi(reg_password_schema),resetPsw)
// 重置密码的验证码
router.post("/resetPsw/code",getPswCode)
// 兑换礼包
router.use("/exchangeGift",exchangeGift)
// 个人信息清单
router.use("/personalList",personalList)
// 第三方共享信息清单
router.get("/shareList",shareList)

export default router