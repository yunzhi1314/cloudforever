import {reactive} from "vue"

 let controlObj=reactive({

    isDialog: {
        isAddMenu:false,
        isAddRole:false,
        isAddUser:false,
    },
 }) 

 export default  controlObj