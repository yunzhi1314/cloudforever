import express from "express"
import { basicMedical,expMedical,expMedicals,naweiCompany, naweiCompany2,messages,navTools} from "./home_handler.mjs"

const router = express.Router()

// 统计计划信息
router.get("/messages",messages)

// 导航栏工具信息
router.get("/navTools",navTools)

// 医药基本数据
router.get("/basicMedical",basicMedical)

// 医药实验基本数据
router.get("/expMedical",expMedical)

// 医药实验数据
router.get("/expMedicals",expMedicals)

// 公司财务数据变化
router.get("/naweiCompany",naweiCompany)

// 公司财务数据变化
router.get("/naweiCompany2",naweiCompany2)

export default router

