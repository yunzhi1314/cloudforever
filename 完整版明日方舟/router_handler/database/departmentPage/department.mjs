import express from "express"
import {addMedical,setMedical,delMedical, queryMedical} from "./department_handler.mjs"

const router = express.Router()

// 向数据库中添加对应的药物数据
router.post("/addMedical",addMedical)

// 查询数据库中对应的数据
router.post("/queryMedical",queryMedical)

// 修改数据库中对应的数据
router.put("/setMedical",setMedical)

// 删除数据库中对应的数据
router.delete("/setMedical",delMedical)

export default router