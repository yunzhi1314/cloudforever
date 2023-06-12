<template>
  <div>
    <!-- 查询，添加按钮 -->
    <el-row>
      <el-col :span="7">
        <el-row type="flex" justify="space-around" style="flex-wrap: nowrap;">

          <el-input v-model="search" prefix-icon="Search" placeholder="请输入查询内容" clearable />
          <el-button type="primary" icon="Search" style="margin-left: 1vw;" @click="query">查询</el-button>
          <el-button type="success" @click="addList">
            <el-icon style="margin-right: 0.5vw;">
              <FolderAdd />
            </el-icon>
            添加
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <!--  表格渲染-->
    <el-table :data="pagArr" height="70vh" row-key="id" style="margin-top: 3vh;">
      <el-table-column prop="medical_indications" label="患病名称" />
      <el-table-column prop="company" label="公司名" />
      <el-table-column prop="medical_ORR" label="medical_ORR" />
      <el-table-column prop="medical_OS" label="medical_OS" />
      <el-table-column prop="medical_PFS" label="medical_PFS" />
      <el-table-column prop="medical_TREE" label="medical_TREE" />
      <el-table-column prop="medical_line" label="线数" />
      <el-table-column prop="medical_enrollees_population" label="数量" />
      <el-table-column prop="medical_name" label="治疗方式" />
      <el-table-column prop="medical_status" label="期数" />
      <el-table-column label="">
        <template #default="scope">
          <el-button type="text" size="mini" style="font-size: 12px;" @click="setList(scope.row)">修改</el-button>
          <el-button type="text" size="mini" style="font-size: 12px;" @click="deleList(scope.row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页显示 -->
    <div style="display: flex; justify-content: center; margin-top: 3vh;">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15]"
        :small="small" layout="total, sizes, prev, pager, next, jumper"
        :total="isSearch ? searchData.length : dataList.length" />
    </div>

    <!-- 点击添加按钮出现的遮罩层 -->

    <dialogPage>
      <div class="dialogMenu" @click.stop>
        <section style="display: flex; justify-content: space-between; ">
          <span>{{ isSearch ? "修改菜单" : "添加菜单" }}</span>
          <el-icon style="cursor: pointer;" @click="controlObj.isDialog.isAddRole = false">
            <Close />
          </el-icon>
        </section>
        <el-form :model="msgObj" :rules="rules" ref="ruleFormRef">
          <el-form-item label="公司名称" required>
            <el-select v-model="msgObj.company" placeholder="请选择公司名称" style="width: 100%;">
              <el-option v-for="(item, index) in compary" :key="index" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="患病名称" style="flex: 3;" prop="medical_indications">
              <el-input v-model="msgObj.medical_indications" placeholder=""></el-input>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="medical_ORR" style="flex: 3;" prop="medical_ORR">
              <el-input v-model="msgObj.medical_ORR" placeholder=""></el-input>
            </el-form-item>

          </div>
          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="medical_OS" style="flex: 3;" prop="medical_OS">
              <el-input v-model="msgObj.medical_OS" placeholder=""></el-input>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="medical_PFS" style="flex: 3;" prop="medical_PFS">
              <el-input v-model="msgObj.medical_PFS" placeholder=""></el-input>
            </el-form-item>
          </div>

          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="medical_TREE" style="flex: 3;" prop="medical_TREE">
              <el-input v-model="msgObj.medical_TREE" placeholder=""></el-input>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="数量" style="flex: 3;" prop="medical_enrollees_population">
              <el-input v-model="msgObj.medical_enrollees_population" placeholder=""></el-input>
            </el-form-item>
          </div>

          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="治疗方式" style="flex: 3;" prop="medical_name">
              <el-input v-model="msgObj.medical_name" placeholder=""></el-input>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="期数" style="flex: 3;" prop="medical_status">
              <el-input v-model="msgObj.medical_status" placeholder=""></el-input>
            </el-form-item>
          </div>

          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="线数" style="flex: 3;" prop="medical_line">
              <el-input v-model="msgObj.medical_line" placeholder=""></el-input>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="id" style="flex: 3;">
              <el-input v-model="msgObj.id" placeholder="" disabled="true"></el-input>
            </el-form-item>
          </div>

          <el-form-item style="display: flex;">
            <div style="flex: 1;"></div>
            <el-button type="" @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm(ruleFormRef)">{{ isSetMenu ? "更改" : "添加" }}</el-button>
          </el-form-item>
        </el-form>

      </div>
    </dialogPage>

  </div>
</template>

<script>
import { ref, reactive, provide } from "vue";
// import { dealMenu } from "@/hooks/dealMenu";
import controlObj from "@/hooks/control";
import url from "@/api/url";
import { addMenu, setMenu, deleMenu } from "@/api/addMenu";
import { ElMessage, ElMessageBox } from 'element-plus'
import { watch } from "vue";

export default {
  name: "rolePage",
  setup() {
    let search = ref("")

    // let { dataList, newArr, compary } = dealMenu()
    let isSearch = ref(false)
    let dataList = ref(JSON.parse(sessionStorage.getItem("expMedicals")).expMedicals)
    let compary = ref(dataList.value.map(item => item.company))
    // console.log('dataList', dataList.value);



    let msgObj = reactive({
      company: '',
      medical_ORR: '',
      medical_OS: '',
      medical_PFS: '',
      medical_TREE: '',
      medical_enrollees_population: '',
      medical_indications: '',
      medical_line: '',
      medical_name: '',
      medical_status: '',
      id: ''
    })

    // console.log(msgObj);

    let searchData = ref('')
    //  查询按钮事件

    function query() {
      isSearch.value = true;

      searchData.value = dataList.value.filter(item =>
        Object.values(item).includes(search.value)

      )

      if (search.value == '') {
        isSearch.value = false
      }

      // console.log('searchData', searchData);
    }

    provide("name", "isAddRole")

    // 新增一项数据的事件
    function addList() {
      // console.log(11111);

      controlObj.isDialog.isAddRole = true
      Reflect.ownKeys(msgObj).forEach(item => {
        Reflect.set(msgObj, item, '')
      })

      msgObj.id = dataList.value.length + 1
    }
    let ruleFormRef = ref('')
    let rules = reactive({})

    //  校验规则
    Reflect.ownKeys(msgObj).forEach(item => {
      Reflect.set(rules, item, {
        required: true,
        message: `请输入${item}`,
        trigger: 'blur',
      })
    })

    let isSetMenu = ref(false)

    // console.log('rules', rules);
    // 遮罩层取消按钮事件
    function cancel() {
      controlObj.isDialog.isAddRole = false;
      isSetMenu.value = false
    }

    // 修改按钮事件
    function setList(item) {
      isSetMenu.value = true
      controlObj.isDialog.isAddRole = true;
      Reflect.ownKeys(msgObj).forEach(key => {
        Reflect.set(msgObj, key, item[key])
      })
    }

    // 删除按钮事件
    function deleList(item) {
      // console.log(item);
      ElMessageBox.confirm(
        '请问确定要删除该信息吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          deleMenu(url.database.role.delMenu, item.id)
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除',
          })
        })
    }

    // 遮罩层提交按钮事件
    const confirm = async (formEl) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          controlObj.isDialog.isAddRole = false
          isSetMenu.value ? setMenu(url.database.role.setMenu, msgObj) : addMenu(url.database.role.addMenu, msgObj)
          console.log('提交成功')
          isSetMenu.value = false
        } else {
          console.log('提交失败', fields)
        }
      })
    }


    // 分页
    let currentPage = ref(1);
    let pageSize = ref(5);
    let pagArr = ref([]);




    watch([currentPage, pageSize, isSearch, searchData], (newValue) => {
      pagArr.value.splice(0, pagArr.value.length)
      console.log(dataList.value);
      newValue[2] ? pagArr.value.push(...(searchData.value.slice((newValue[0] - 1) * newValue[1], newValue[0] * newValue[1])))
        : pagArr.value.push(...dataList.value.slice((newValue[0] - 1) * newValue[1], newValue[0] * newValue[1]))
    }, { immediate: true, deep: true })

    console.log('pagArr', pagArr);

    return {
      search,
      // newArr,
      searchData,
      isSearch,
      msgObj,
      controlObj,
      compary,
      rules,
      isSetMenu,
      ruleFormRef,
      dataList,
      currentPage,
      pageSize,
      pagArr,
      query,
      addList,
      cancel,
      setList,
      deleList,
      confirm,

    }
  }
}
</script>

<style lang="scss" scoped>
.dialogMenu {
  width: 50vw;
  height: 65vh;
  padding: 2vw;
  background-color: white;
  border-radius: 2vw;
}
</style>