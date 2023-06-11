import database from "../../static/database.mjs"

export function menu(req,res){
    res.send({status:"0",menu:database.layout.menus})
}

