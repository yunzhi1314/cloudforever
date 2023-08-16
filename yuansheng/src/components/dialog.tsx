import { Teleport } from "vue"

interface fun {
    arrname: Array<string>,
    arrpase: Array<string>
}

export default function DialogFun(arr: fun) {

    return (
        <Teleport to="#app">
            <div class="dialog">
                <div class="from">

                    {arr.arrname.map((item, index) => {
                        return (
                            <el-form-item label={item} prop="input85105"  style="width=`100px`" >
                                <el-input  type="text" clearable ></el-input>
                            </el-form-item>
                        )
                    })}

                </div>
            </div>
        </Teleport>
    )
}