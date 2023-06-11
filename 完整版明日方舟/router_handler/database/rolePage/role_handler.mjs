import mysql from "../../../db/users.mjs"

export function addMedical(req,res){
    const {id,...userinfo} = req.body

    const sql = `insert into users.medical_experiment_nsclc set ?`
    mysql.query(sql,userinfo,(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc("添加失败，请重新尝试！")
        
        res.send({status:"0",message:"信息添加成功！"})
    })
}

export function queryMedical(req,res){
    const {id} = req.body

    const sql = `select * from users.medical_experiment_nsclc where id=?`
    mysql.query(sql,id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length < 1) return res.cc("无对应id的药品信息")

        res.send({status:"0",datas:result[0]})
    })
}

export function setMedical(req,res){
    const {children,id,...userinfo} = req.body
    
    const sql = `update users.medical_experiment_nsclc set ? where id = ?`
    mysql.query(sql,[userinfo,id],(err,result)=>{
        if(err) return res.cc(err) 
        if(result.affectedRows !== 1) return res.cc("对应的数据修改失败")
        
        res.send({status:"0",message:"数据修改成功！"})
    })
}


export function delMedical(req,res){
    const userinfo = req.query
    let id = userinfo.id*1

    const sql = `DELETE FROM medical_experiment_nsclc WHERE id= ?`
    mysql.query(sql,id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc("数据删除失败！")
        
        res.send({status:"0",message:"数据删除成功！"})
    })
}
