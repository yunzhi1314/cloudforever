<template>
  <div class="wirpper" style="display:block;padding:1vw; background-color: white;">
    <!-- 添加查询按钮 -->
    <el-row>
      <el-col :span="7">
        <el-row class="nav" justify="space-around" style="flex-wrap: nowrap;">
          <el-input v-model="search" placeholder="请输入查询内容" style="width: 60vw;" />
          <el-button icon="search" @click="searchBtn" type="primary" style="margin-left:1vw">查询</el-button>
          <el-button icon="FolderAdd" type="success" @click="addTabMenu">新增菜单</el-button>
        </el-row>
      </el-col>
    </el-row>
    <!-- 通过搜索控制展示的数据是搜索内容还是初始数据 -->
    <el-table :data="isSearch ? searchData : newData" height="530" style="margin-top: 3vh" row-key="id">
      <el-table-column fixed label="药物名称" prop="medical_name"></el-table-column>
      <el-table-column label="所属公司" prop="medical_company"></el-table-column>
      <el-table-column label="靶向" prop="medical_target" width="140"></el-table-column>
      <el-table-column label="线数" prop="medical_indications"></el-table-column>
      <el-table-column label="治疗方式" prop="medical_treatment">
      </el-table-column>
      <el-table-column label="区域" prop="medical_area" width="140"></el-table-column>
      <el-table-column label="操纵">
        <template #default="scope">
          <el-button link size="small" style="font-size: 12px;margin:0; width:28%;color:#409eff;"
            @click="addTabMenu">新增</el-button>
          <el-button link size="small" style="font-size: 12px;margin:0;width:28%;color:#409eff;"
            @click="setTabMenu(scope.row)">修改</el-button>
          <el-button link size="small" style="font-size: 12px;margin:0;width:28%;color:#409eff;"
            @click="delTabMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 新增/修改菜单的遮罩层 -->
  <dialogPage>
    <div style=" width: 40vw;
      height:45vh;
      background-color: #fff;
      padding:1vw;
      border-radius: 1vw;" @click.stop>
      <section style="display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3.5vh;">
        <span>{{ isSetMenu ? "修改菜单" : "新增菜单" }}</span>
        <el-icon color="#666" style="cursor: pointer;" @click="controlObj.isDialog.isAddMenu = false">
          <Close></Close>
        </el-icon>
      </section>
      <!-- 表单区 -->
      <el-form :model="addLab" :rules="rules" ref="ruleMenu">
        <el-form-item label="所属公司">
          <el-select style="width: 100%" v-model="addLab.medical_company" placeholder="请选择所属公司">
            <el-option v-for="(item, index) in companys" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <div style="display: flex; justify-content: space-between">
          <el-form-item label="药物名称" prop="medical_name" style="flex: 3">
            <el-input v-model="addLab.medical_name" placeholder="请选择药物名称"></el-input>
          </el-form-item>

          <div style="flex: 0.5"></div>
          <el-form-item label="靶向" prop="medical_target" style="flex: 3">
            <el-input v-model="addLab.medical_target" placeholder="请选择靶向"></el-input>
          </el-form-item>

        </div>

        <div style="display: flex; justify-content: space-between;">
          <el-form-item label="线数" prop="medical_indications" style="flex: 2.5">
            <el-input v-model="addLab.medical_indications" placeholder="请选择线数"></el-input>
          </el-form-item>

          <div style="flex: 0.7"></div>

          <el-form-item label="治疗方式" prop="medical_treatment" style="flex: 3.25">
            <el-input v-model="addLab.medical_treatment" placeholder="请选择治疗方式">
            </el-input>
          </el-form-item>
        </div>

        <el-form-item label="区域">
          <el-radio-group v-model="addLab.medical_area">
            <el-radio label="中国" />
            <el-radio label="国际" />
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <div>
            <div style="flex: 1;"></div>
            <el-button style="width:60px" @click="cancel">取消</el-button>
            <el-button style="width:60px" @click="submitForm(ruleMenu)" type="primary">
              {{ isSetMenu ? "修改" : "新增" }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>

    </div>
  </dialogPage>
</template>

<script>
import { provide, reactive, ref, toRefs, h } from "vue"
import menuPage from "@/public/database/menu/menuPage.scss"
import { dealTree } from "@/hooks/database/menuPage"
import controlObj from '@/hooks/controlObj'
import { addMenu, setMenu, delMenu } from "@/api/arknight/database/menu"
import { ElMessage, ElMessageBox } from "element-plus";
import url from "@/api/url"
export default {
  name: "menuPage",
  setup() {
    /* 菜单数据原始数据 */
    let Datalist = ref(JSON.parse(sessionStorage.getItem("medical")).basicMedical)
    /* 搜索框内容 */
    let search = ref('')
    /* 判断是否开始搜索 */
    let isSearch = ref(false)
    /* 搜索框输入时筛选的数据内容 */
    let searchData = ref('')

    /* 点击查询按钮 */
    function searchBtn() {
      isSearch.value = true;
      searchData.value = Datalist.value.filter((item) =>
        item.medical_area == search.value ||
        item.medical_company == search.value ||
        item.medical_indications == search.value ||
        item.medical_name == search.value ||
        item.medical_target == search.value ||
        item.medical_treatment == search.value ||
        search.value == ''
      )
      if (search.value == '') {
        isSearch.value = false
      }
    }
    /* 遮罩层所需参数 */
    provide("controlDialog", "isAddMenu")
    /* 验证表单 */
    let ruleMenu = ref("")
    /* 表单输入内容 */
    let addLab = reactive({
      medical_name: "",
      medical_company: "",
      medical_target: "",
      medical_indications: "",
      medical_treatment: "",
      medical_area: "",
      id: "",
    })
    /* 表单规则 */
    let rules = reactive({
      medical_name: {
        required: true,
        message: "请输入药品信息",
        trigger: "blur",
      },
      medical_company: {
        required: true,
        message: "请选择公司信息",
        trigger: "blur",
      },
      medical_target: {
        required: true,
        message: "请输入靶向信息",
        trigger: "blur",
      },
      medical_indications: {
        required: true,
        message: "请输入线数信息",
        trigger: "blur",
      },
      medical_treatment: {
        required: true,
        message: "请输入治疗方式信息",
        trigger: "blur",
      },
      medical_area: {
        required: true,
        message: "请选择地区信息",
        trigger: "blur",
      },
    })

    /* 新增按钮的事件 */
    function addTabMenu() {
      controlObj.isDialog.isAddMenu = true
      Reflect.ownKeys(addLab).forEach((key) => {
        Reflect.set(addLab, key, '')
      })
    }

    /* 是否是修改内容的按钮 */
    let isSetMenu = ref(false)
    /* 修改按钮事件 */
    function setTabMenu(item) {
      /* 修改按钮开启  */
      isSetMenu.value = true
      /* 通过传入的值 遍历出对应key值内容 */
      Reflect.ownKeys(addLab).forEach(key => {
        Reflect.set(addLab, key, item[key])
      })
      /* 遮罩层开启 */
      controlObj.isDialog.isAddMenu = true
    }
    /* 删除按钮事件 */
    function delTabMenu(item) {
      ElMessageBox({
        /* 标题头 */
        title: "删除信息",
        /* 提示框内容 */
        message: h("p", null, [
          h("span", { style: "font-size:19px;font-weight:bold;" }, "你确认删除这项信息吗？")
        ]),
        // 显示取消按钮
        showCancelButton: true,
        // 确认按钮的文本
        confirmButtonText: "确认",
        // 取消按钮的文本
        cancelButtonText: "取消",
        customClass: "MSGBOX",
        confirmButtonClass: "OKCSS",
        cancelButtonClass: "OKCSS",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // 开启提示框确认按钮的加载动画
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";

            // 在结束提示框之前去进行请求
            delMenu(url.database.menu.delMenu, item.id)
            setTimeout(() => {
              // 结束提示框的行为并关闭提示框
              done();
              setTimeout(() => {
                // 结束提示框确认按钮的加载动画
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then(() => {
        ElMessage({
          type: 'info',
          message: '删除成功'
        })
      }).catch(err => console.log(err))
    }

    /* 表单内提交按钮 */
    const submitForm = async (forElement) => {
      if (!forElement) return;
      /* 调用表单的验证方法 */
      await forElement.validate((valid, fields) => {
        if (valid) {
          controlObj.isDialog.isAddMenu = false
          /* 判断修改按钮的是否开启 来使用对应请求 */
          isSetMenu.value ? setMenu(url.database.menu.setMenu, addLab) : addMenu(url.database.menu.addMenu, addLab)
          /* 关闭修改按钮 */
          isSetMenu.value = false
        } else {
          console.log("error Submit", fields);
        }
      })
    }

    /* 表单内按钮取消 撤销遮罩层 */
    function cancel() {
      controlObj.isDialog.isAddMenu = false
      isSetMenu.value = false
    }

    return {
      /* 样式 */
      menuPage,
      /* 处理菜单数据结构 */
      ...toRefs(dealTree()),
      /* 搜索框内容 */
      search,
      /* 判断是否开始搜索 */
      isSearch,
      /* 搜索框输入时筛选的数据内容 */
      searchData,
      /* 点击查询按钮 */
      searchBtn,
      /* 按钮集合 */
      controlObj,
      /* 新增按钮的事件 */
      addTabMenu,
      /* 表单输入内容 */
      addLab,
      /* 表单规则 */
      rules,
      /* 表单内提交按钮 */
      submitForm,
      /* 表单内按钮取消 撤销遮罩层 */
      cancel,
      /* 验证表单 */
      ruleMenu,
      /* 是否是修改内容的按钮 */
      isSetMenu,
      /* 修改按钮事件 */
      setTabMenu,
      /* 删除按钮事件 */
      delTabMenu,
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 3vh;

  .el-form-item__content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
}
</style>
