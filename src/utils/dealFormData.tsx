import req from '@/utils/request'
import store from '@/store'
import { Teleport, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import  controlObj  from '@/utils/controls'
import { log } from 'console'

// 获取表格数据
export function getFormData(url:string) {
  req.get(`database/home/${url}`).then((res) => {
    store.commit('formData/setMsg', {
      name: url,
      data: res.data.datas
    })
  })
}

// 表单上下文数据对象接口
interface Context<T> {
  addData: T
  labelArr: T
  index:T
}

// 遮罩层组件
export default function FormData(context: Context<any>) {
  let addDataArr = Reflect.ownKeys(context.addData)
  let labelArr = context.labelArr
  console.log("addDataArr",addDataArr);
  console.log("labelArr",labelArr);
  console.log(context.addData);
  
  const ruleFormRef = ref<FormInstance>()
  let rules = reactive<FormRules<any>>({})

  
  addDataArr.forEach((item, index) => {
    Reflect.set(rules, item, [
      {
        required: true,
        message: `请输入${context.labelArr[index]}`,
        trigger: 'blur'
      }
    ])
  })
  const handleCancel = () => {
    controlObj.isBasicMsg = false
    console.log(controlObj.isBasicMsg);
  }
  
  const handleSubmit = () => {
    console.log(context.addData);
    let datas = context.addData
    req.post("/database/medical/addMedical",{
      datas
  }).then(res => {
      console.log(res);
      
    }).catch(error => {
      console.error(error)
    })
  }

  return (
    <Teleport to="#app">
      <dialog>
        <div class="formBoard">
          <section class="form_title">
            <span>新增菜单</span>
            <span onClick={handleCancel}>×</span>
          </section>
            <el-form
              class="form"
              ref="formRule"
              model={context.addData}
              rules={rules}
            >
              <section style="width:20vw;">
                <span>{labelArr[1]}</span>
                <el-select 
                v-model={context.addData.medical_area}
                class="ml-4">
                  <el-option>III</el-option>
                  <el-option>Ia</el-option>
                  <el-option>Ib_II</el-option>
                  <el-option>NDA</el-option>
                  <el-option>market</el-option>
                </el-select>
              </section>
              {addDataArr.map((item, index) => {
                if ( index < 7) {
                  return (
                    <el-form-item
                      style="width:20vw;"
                      key={index}
                      label={context.labelArr[index]}
                      prop={item}
                      >
                      <el-input
                        v-model={context.addData[item]}
                        placeholder={`请输入${context.labelArr[index]}`}
                      ></el-input>
                    </el-form-item>
                  )
                }
              })}
            <section style="position: absolute;right: 30px;bottom: 15px;">
              <el-button onClick={handleSubmit}>提交</el-button>
              <el-button onClick={handleCancel}>取消</el-button>
            </section>
            
          </el-form>
          <section> 
          </section>
        </div>
      </dialog>
    </Teleport>
  )
}
