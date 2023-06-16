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
      <el-table-column prop="medical_name" label="药品名称" />
      <el-table-column label="研发进度">
        <template #default="scope">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.process" :status="scope.row.name" />
        </template>
      </el-table-column>
      <el-table-column prop="medical_enrollees_population_china" label="中国入组人数" />
      <el-table-column prop="medical_enrollees_population_internal" label="国际入组人数" />
      <el-table-column prop="medical_first_publication" label="上市时间" />
      <el-table-column prop="medical_CTR" label="medical_CTR" />
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
          <el-icon style="cursor: pointer;" @click="controlObj.isDialog.isAddUser = false">
            <Close />
          </el-icon>
        </section>
        <el-form :model="msgObj" :rules="rules" ref="ruleFormRef">
          <el-form-item label="研发进度" required>
            <el-select v-model="msgObj.process" placeholder="请选择研发进度" style="width: 100%;">
              <el-option v-for="(item, index) in processList[0]" :key="index" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="FPIchina" style="flex: 3;" prop="FPIchina">
              <el-input v-model="msgObj.FPIchina" placeholder=""></el-input>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="medical_CTR" style="flex: 3;" prop="medical_CTR">
              <el-input v-model="msgObj.medical_CTR" placeholder=""></el-input>
            </el-form-item>

          </div>
          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="中国入组人数" style="flex: 3;" prop="medical_enrollees_population_china">
              <el-input v-model="msgObj.medical_enrollees_population_china" placeholder=""></el-input>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="国际入组人数" style="flex: 3;" prop="medical_enrollees_population_internal">
              <el-input v-model="msgObj.medical_enrollees_population_internal" placeholder=""></el-input>
            </el-form-item>
          </div>

          <div style="display: flex; justify-content:space-around;">
            <el-form-item label="上市时间" style="flex: 3;" prop="medical_first_publication">
              <!-- <el-input v-model="msgObj.medical_first_publication" placeholder=""></el-input> -->
              <el-col :span="7">
                <el-date-picker v-model="msgObj.medical_first_publication" type="date" label="请选择日期"
                  placeholder="请选择日期" />
              </el-col>
            </el-form-item>
            <div style="flex:0.3"></div>
            <el-form-item label="药品名称" style="flex: 3;" prop="medical_name">
              <el-input v-model="msgObj.medical_name" placeholder=""></el-input>
            </el-form-item>
          </div>

          <div style="display: flex; justify-content:space-around;">
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
import controlObj from "@/hooks/control";
import url from "@/api/url";
import { addMenu, setMenu, deleMenu } from "@/api/addMenu";
import { ElMessage, ElMessageBox } from 'element-plus'
import { watch } from "vue";
import { dealUser } from "@/hooks/dealUser"
export default {
  name: "userPage",
  setup() {

    let { dataList, processList } = dealUser()
    // console.log('dataList', dataList);
    dataList = ref(dataList)
    let search = ref("");
    let isSearch = ref(false);

    // 进度条状态颜色变化 

    dataList.value.forEach(item => {
      if (item.process < 50) {

        Reflect.set(item, "name", "exception")
      } else if (item.process < 100 && item.process >= 50) {

        Reflect.set(item, "name", "warning")
      } else {

        Reflect.set(item, "name", "success")
      }

    })

    let msgObj = reactive({
      FPIchina: '',
      medical_CTR: '',
      medical_enrollees_population_china: '',
      medical_enrollees_population_internal: '',
      medical_first_publication: '',
      medical_name: '',
      process: '',
      id: '',
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
    }

    provide("name", "isAddUser")

    // 新增一项数据的事件
    function addList() {

      controlObj.isDialog.isAddUser = true
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

    // 设置CTR校验的开关
    let isCtr = ref(false)

    // 设置CTR的正侧
    watch(() => msgObj.medical_CTR, (newValue) => {
      let zz1 = /^CTR(2{1}0{1}[0-1]{1}\d{1})\d{4}$/
      let zz2 = /^CTR(2{1}0{1}2{1}[0-3]{1})\d{4}$/
      if (zz1.test(newValue)) {
        isCtr.value = true;
      } else if (zz2.test(newValue)) {
        isCtr.value = true;
      } else {
        isCtr.value = false;
      }
    })

    let isSetMenu = ref(false)

    // console.log('rules', rules);
    // 遮罩层取消按钮事件
    function cancel() {
      controlObj.isDialog.isAddUser = false;
      isSetMenu.value = false
    }

    // 修改按钮事件
    function setList(item) {
      isSetMenu.value = true
      controlObj.isDialog.isAddUser = true;
      Reflect.ownKeys(msgObj).forEach(key => {
        Reflect.set(msgObj, key, item[key])

        switch (msgObj.process) {
          case '': msgObj.process = ref('');
            break;
          case 20: msgObj.process = ref('Ia');
            break;
          case 40: msgObj.process = ref('Ib_II');
            break;
          case 60: msgObj.process = ref('III');
            break;
          case 80: msgObj.process = ref('NDA');
            break;
          case 100: msgObj.process = ref('market');
            break;
        }
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
          deleMenu(url.database.user.delMenu, item.id)
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
        if (valid && isCtr.value) {
          controlObj.isDialog.isAddUser = false

          processList[0].forEach((item, index) => {
            switch (msgObj.process) {
              case item: msgObj.process = ref((index + 1) * 20);
                break;
            }
          })

          isSetMenu.value ? setMenu(url.database.user.setMenu, msgObj) : addMenu(url.database.user.addMenu, msgObj)
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
      processList,
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