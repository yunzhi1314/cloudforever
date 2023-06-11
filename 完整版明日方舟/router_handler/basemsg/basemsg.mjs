import {baseMsg,setEmail,setTel,setID,setNickName} from "./basemsg_handle.mjs"
import { reg_email_schema,reg_codeLogin_schema ,reg_ID_schema} from "../../schema/user.mjs"
import expressJoi from "@escook/express-joi"
import express from "express"

const router = express.Router()

// 获取用户基本信息
router.post("/userinfo",baseMsg)

// 修改邮箱
router.put("/email",expressJoi(reg_email_schema),setEmail)

// 修改手机号
router.put("/telephone",expressJoi(reg_codeLogin_schema),setTel)

// 修改身份证
router.put("/idNumber",expressJoi(reg_ID_schema),setID)

// 修改身份证
router.put("/nickName",setNickName)

export default router