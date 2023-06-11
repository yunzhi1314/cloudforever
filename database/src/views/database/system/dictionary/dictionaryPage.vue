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
      <el-table :data="isSearch ? searchData : newArr" height="70vh" row-key="id" style="margin-top: 3vh;">
          <el-table-column :prop="item.prop" :label="item.label" v-for="(item,index) in tableArr" :key="index"/>

          <el-table-column label="操作">
              <template #default="scope">
                  <el-button type="text" size="mini" style="font-size: 12px;" @click="addList">添加</el-button>
                  <el-button type="text" size="mini" style="font-size: 12px;" @click="setList(scope.row)">修改</el-button>
                  <el-button type="text" size="mini" style="font-size: 12px;" @click="deleList(scope.row,url.database.menu.delMenu)">删除</el-button>
              </template>

          </el-table-column>
      </el-table>

      <!-- 点击添加按钮出现的遮罩层 -->
      <dialogPage>
          <div class="dialogMenu" @click.stop>
              <section style="display: flex; justify-content: space-between; ">
                  <span>{{ isSearch ? "修改菜单" : "添加菜单" }}</span>
                  <el-icon style="cursor: pointer;" @click="controlObj.isDialog.isAddMenu = false">
                      <Close />
                  </el-icon>
              </section>
              <el-form :model="msgObj" :rules="rules" ref="ruleFormRef" status-icon>
                  <el-form-item label="公司名称" prop="medical_company">
                      <el-select v-model="msgObj.medical_company" placeholder="请选择公司名称" style="width: 100%;">
                          <el-option v-for="(item, index) in compary" :key="index" :value="item"
                              :label="item"></el-option>
                      </el-select>
                  </el-form-item>
                  <div style="display: flex;
                  width: 100%;
                  flex-wrap: wrap;
                  justify-content: space-between;">
                  <section v-for="(item,index) in tableArr" :key="index" style="width:21.5vw">
                      <el-form-item :label="item.label" :prop="item.prop" style="width:100%" v-if="item.label!= '公司名称'">
                          <el-input v-model="msgObj[item.prop]"></el-input>
                      </el-form-item>
                      <el-form-item label="id" style="flex: 3;" v-if="item.label == '公司名称'">
                          <el-input v-model="msgObj.id" disabled="true"></el-input>
                      </el-form-item>
                  </section>
                  </div>
                  <!-- <div style="display: flex; justify-content:space-around;">
                      <el-form-item label="药品名称" style="flex: 3;"  prop="medical_name">
                          <el-input v-model="msgObj.medical_name" placeholder=""></el-input>
                      </el-form-item>
                      <div style="flex:0.3"></div>
                      <el-form-item label="线数" style="flex: 3;"  prop="medical_indications">
                          <el-input v-model="msgObj.medical_indications" placeholder=""></el-input>
                      </el-form-item>
                  </div>
                  <div style="display: flex; justify-content:space-around;">
                      <el-form-item label="靶向" style="flex: 3;"  prop="medical_target">
                          <el-input v-model="msgObj.medical_target" placeholder=""></el-input>
                      </el-form-item>
                      <div style="flex:0.3"></div>
                      <el-form-item label="治疗方式" style="flex: 3;"  prop="medical_treatment">
                          <el-input v-model="msgObj.medical_treatment" placeholder=""></el-input>
                      </el-form-item>
                  </div>
                  <div style="display: flex; justify-content:space-around;">
                      <el-form-item label="区域" style="flex: 3;"  prop="medical_area">
                          <el-input v-model="msgObj.medical_area" placeholder=""></el-input>
                      </el-form-item>
                      <div style="flex:0.3"></div>
                      <el-form-item label="药物id" style="flex: 3;">
                          <el-input v-model="msgObj.id" placeholder="" disabled="true"></el-input>
                      </el-form-item>
                  </div> -->
                  <el-form-item style="display: flex;">
                      <div style="flex: 1;"></div>
                      <el-button type="" @click="cancel">取消</el-button>
                      <el-button type="primary" @click="confirm(ruleFormRef,'isAddMenu',isSetMenu,msgObj,url.database.menu.setMenu,url.database.menu.addMenu)">{{ isSetMenu ? "更改" : "添加" }}</el-button>
                  </el-form-item>
              </el-form>

          </div>
      </dialogPage>

  </div>
</template>

<script>
import { ref, reactive, provide } from "vue";
import { dealMenu } from "@/hooks/dealMenu";
import controlObj from "@/hooks/control";
import url from "@/api/url";
import {deleList,confirm,getMsgObj} from '@/hooks/menuPage'

export default {
  name: "menuPage",
  setup() {
      let search = ref("")
      let { dataList, newArr, compary } = dealMenu()
      // dataList = ref(dataList)
      let isSearch = ref(false)
      let msgObj = reactive({
      })
      let ruleFormRef = ref('')
      let rules = reactive({})
      //  校验规则
      let requireTextArr = ['','区域','公司名称','线数','药品名称','靶向','治疗方式','']
      let tableArr = []
      
      getMsgObj(dataList[0],msgObj,rules,requireTextArr,tableArr)
      console.log(requireTextArr);
      console.log(tableArr);
      let searchData = ref('')
      //  查询按钮事件

      function query() {
          isSearch.value = true;
          searchData.value = dataList.filter(item =>
              Object.values(item).includes(search.value)
          )
          if (search.value == '') {
              isSearch.value = false
          }
      }

      provide("name", "isAddMenu")

      // 新增一项数据的事件
      function addList() {
          // console.log(11111);
          controlObj.isDialog.isAddMenu = true
          Reflect.ownKeys(msgObj).forEach(item => {
              Reflect.set(msgObj, item, '')
          })

          msgObj.id = dataList.length + 1
      }
      let isSetMenu = ref(false)
      
      // 遮罩层取消按钮事件
      function cancel() {
          controlObj.isDialog.isAddMenu = false;
          isSetMenu.value = false
      }

      // 修改按钮事件
      function setList(item) {
          isSetMenu.value = true
          controlObj.isDialog.isAddMenu = true;
          Reflect.ownKeys(msgObj).forEach(key => {
              Reflect.set(msgObj, key, item[key])
          })
      }

      return {
          search,
          newArr,
          searchData,
          isSearch,
          msgObj,
          controlObj,
          compary,
          rules,
          isSetMenu,
          ruleFormRef,
          query,
          addList,
          cancel,
          setList,
          deleList,
          confirm,
          url,
          tableArr,
      }
  }
}
</script>

<style lang="scss" scoped>
.dialogMenu {
  width: 50vw;
  height: 48vh;
  padding: 2vw;
  background-color: white;
  border-radius: 2vw;
}
</style>