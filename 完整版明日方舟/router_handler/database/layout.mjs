import { menu } from "./menu_handler.mjs"
import express from "express"

const router = express.Router()

// 获取菜单动态路由
router.get("/menu",menu)

export default router