import { Teleport, reactive } from 'vue'
import { conObj } from '@/utils/controls'
interface fun {
    arrname: Array<string>
    arrpase: Array<string>
}

export default function DialogFun(arr: fun) {

    let fromData: any = reactive({})
    arr.arrpase.forEach((item, index) => {
        fromData[item] = ""
    })
    console.log(fromData);
    function add() {
        console.log(fromData);

    }
    return (
        <Teleport to="#app">
            <div class="dialog" style={conObj.conDialog ? 'display: flex;' : 'display:none'}>
                <div class="from">
                    <section
                        style="display: flex;
                        justify-content: space-between;">
                        <span>新增表单</span>
                        <span>X</span>
                    </section>
                    <el-form
                        label-position="left"
                        label-width="100px"
                        model={fromData}
                        style="max-width: 620px;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;"
                    >
                        {arr.arrname.map((item, index) => {

                            return (
                                <el-form-item
                                    label={item}
                                    prop="input85105"
                                    style="width=`100px`"
                                >
                                    <el-input type="text" v-model={fromData[arr.arrpase[index]]} ></el-input>
                                </el-form-item>

                            )
                        })}
                    </el-form>
                    <section>
                        <button onClick={add}>添加</button>
                        <button>取消</button>
                    </section>
                </div>
            </div>
        </Teleport>
    )
}
