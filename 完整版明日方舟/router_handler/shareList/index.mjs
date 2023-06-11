import arknights from "../../static/arknights.mjs"

export function shareList(req,res){
    res.send({
        status:"0",
        shareList:arknights.personlCenter.shareList
    })
}
