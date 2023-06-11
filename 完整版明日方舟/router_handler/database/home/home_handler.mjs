import mysql from "../../../db/users.mjs"
import database from "../../../static/database.mjs"

export function messages(req,res){
    res.send({status:"0",menu:database.home.message})
}

export function navTools(req,res){
    res.send({status:"0",menu:database.home.navTool})
}


export function basicMedical(req,res){
    const sql = `select * from users.medical_basic`
    mysql.query(sql,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length < 1) return res.cc("数据库查询无结果")

        res.send({status:"0",datas:result})
    })
}   

export function expMedical(req,res){
    const sql = `select * from users.medical_experiment_basic`
    mysql.query(sql,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length < 1) return res.cc("数据库查询无结果")

        res.send({status:"0",datas:result})
    })
}  

export function naweiCompany(req,res){
    const sql = `select * from users.nawei_finance1`
    mysql.query(sql,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length < 1) return res.cc("数据库查询无结果")
        result[7].growth_rate01 = "45.34"
        res.send({status:"0",datas:result})
    })
}  

export function naweiCompany2(req,res){
    const sql = `select * from users.nawei_finance2`
    mysql.query(sql,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length < 1) return res.cc("数据库查询无结果")

        res.send({status:"0",datas:result})
    })
}
// `medical_experiment_nsclc`
export function expMedicals(req,res){
    const sql = `select * from users.medical_experiment_nsclc`
    mysql.query(sql,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length < 1) return res.cc("数据库查询无结果")

        res.send({status:"0",datas:result})
    })
} 