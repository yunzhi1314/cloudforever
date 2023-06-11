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
        <el-table :data="isSearch ? searchData : newData" height="70vh" row-key="id" style="margin-top: 3vh;">
            <el-table-column :prop="item.prop" :label="item.label" v-for="(item,index) in tableArr" :key="index"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" size="mini" style="font-size: 12px;" @click="setList(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="display: flex; justify-content: center; margin-top: 3vh;">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 8]"
        :small="small" layout="total, sizes, prev, pager, next, jumper"
        :total="isSearch ? searchData.length : newData.length" />
    </div>


  
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
                    <div style="display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    justify-content: space-between;">
                    <section v-for="(item,index) in tableArr " :key="index" style="width:21.5vw">
                        <el-form-item :label="item.label" :prop="item.prop" style="width:100%" v-if="item.prop!='time'">
                            <el-input v-model="msgObj[item.prop]"></el-input>
                        </el-form-item>
                        <el-form-item v-if="item.prop=='time'" style="width:100%" :label="item.label" :prop="item.prop">
                          <el-date-picker
                            v-model="msgObj[item.prop]"
                            type="year"
                            placeholder="请选择年份"
                          />
                        </el-form-item>
                    </section>
                    </div>
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
  import { ref, reactive, provide,watch } from "vue";
  import controlObj from "@/hooks/control";
  import url from "@/api/url";
  import {deleList,confirm,getMsgObj} from '@/hooks/menuPage'
  
  export default {
    name: "departmentPage",
    setup() {
        let search = ref("")
        let database = ref(JSON.parse(sessionStorage.getItem('naweiCompany2')).naweiCompany2)
        console.log(database);
        let timeArr = [
                  "2019年6月",
                  "2019年12月",
                  "2020年6月",
                  "2021年6月",
                  "2020年12月",
                  "2021年6月",
                  "2022年6月",
                  "2022年12月",
              ]
        let newData = database.value.map((item,index)=>({
          time:timeArr[index],
          EBIT:item.EBIT,
          EBITDA:item.EBITDA,
          NPTP:item.NPTP,
          Profit_before_tax:item.Profit_before_tax,
          growth_rate01:item.growth_rate01,
          growth_rate05:item.growth_rate05,
          Profit_from_operations:item.Profit_from_operations
        }))
  
        console.log(newData);
        let isSearch = ref(false)
        let msgObj = reactive({
        })
        let ruleFormRef = ref('')
        //  校验规则
        let rules = reactive({})
        // 规则文本
        let requireTextArr = ['日期','税前利润/元','总利润/元','下半年增长/%','上半年增长/%','当前资产/元','未分配利润/元','总资产/元']
        // 渲染form-item的信息
        let tableArr = []
        
        
        // 生成msgObj，rules，tableArr的函数
        getMsgObj(newData[0],msgObj,rules,requireTextArr,tableArr)
  
        let searchData = ref('')
  
        //  查询按钮事件
        function query() {
            isSearch.value = true;
            searchData.value = newData.filter(item =>
                Object.values(item).includes(search.value)
            )
            if (search.value == '') {
                isSearch.value = false
            }
        }
  
        provide("name", "isAddMenu")
  
        // 新增一项数据的事件
        function addList() {
            controlObj.isDialog.isAddMenu = true
            Reflect.ownKeys(msgObj).forEach(item => {
                Reflect.set(msgObj, item, '')
            })
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

        let currentPage = ref(1);
    let pageSize = ref(5);
    let pagArr = ref([]);




    watch([currentPage, pageSize, isSearch, searchData], (newValue) => {
      pagArr.value.splice(0, pagArr.value.length)
      newValue[2] ? pagArr.value.push(...(searchData.value.slice((newValue[0] - 1) * newValue[1], newValue[0] * newValue[1])))
        : pagArr.value.push(...database.value.slice((newValue[0] - 1) * newValue[1], newValue[0] * newValue[1]))
    }, { immediate: true, deep: true })

  
        return {
            search,
            newData,
            searchData,
            isSearch,
            msgObj,
            controlObj,
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