import express from "express"
import layout from "../router_handler/database/layout.mjs"
import home from "../router_handler/database/home/home.mjs"
import menu from "../router_handler/database/menuPage/menu.mjs"
import user from "../router_handler/database/userPage/user.mjs"
import role from "../router_handler/database/rolePage/role.mjs"
import department from "../router_handler/database/departmentPage/department.mjs"
import dictionary from "../router_handler/database/dictionaryPage/dictionary.mjs"

const router = express.Router()

// 动态路由
router.use("/layout",layout)

// home首页图表数据
router.use("/home",home)

// menu表格数据
router.use("/menu",menu)

// 角色表格数据
router.use("/role",role)

// 用户表格数据
router.use("/user",user)

// 公司表格1数据
router.use("/department",department)

// 公司表格2数据
router.use("/dictionary",dictionary)

export default router