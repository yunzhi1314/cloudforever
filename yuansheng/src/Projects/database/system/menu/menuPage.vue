<template>
    <div style="padding-left: 10px;">
        <el-row>
            <el-input v-model="search" style="width: 10vw;" :prefix-icon="Search" placeholder="请输入搜索关键字" />
            <el-button type="primary" style="margin:  0 1vw;" :icon="Search" @click="getData">搜索</el-button>
            <el-button type="success" :icon="Edit">新增表达</el-button>
        </el-row>
        <el-table :data="controlObj.isSearch ? tableData : telData" height="600px" style="width: 100%" row-key="id">
            <el-table-column v-for="(item, index) in labelArr" :key="index" :prop="propArr[index]" :label="item"
                width="180" />
        </el-table>
        <addFrom></addFrom>
    </div>
</template>

<script setup lang="ts">
import { Search, Edit } from '@element-plus/icons-vue'
import { reactive, ref } from "vue"
import type { Ref } from "vue"
import { useStore } from "vuex"
import { MenuPage } from "@/interface/index"
import controlObj from '../../../../utils/controls'
import { addFrom } from "@/utils/addfrom"
let search: Ref<string> = ref("")
const state = useStore().state
let labelArr: string[] = ["公司名称", "药物名称", "靶向", "线数", "治疗方式", "区域"]
let propArr: string[]
let tableData: MenuPage[] = reactive([])
tableData = [...state.menuDate]

propArr = (Reflect.ownKeys(tableData[0]) as string[])

propArr.shift()
propArr.unshift(...propArr.splice(2, 1))
function teldataFun(arr: any[]) {
    let arr2: MenuPage[] = []
    let i = 0
    arr.forEach((item, index) => {
        let con = true
        for (let i = 0; i < arr2.length; i++) {
            if (arr2[i].medical_company == item.medical_company) {
                (arr2[i].children as MenuPage[]).push({ ...item });
                con = false;
                break
            }
        }
        if (con) {
            arr2.push({ ...item })
            arr2[i].children = [];
            i++
        }
    })
    return arr2
}

let telData = teldataFun(tableData)







function getData() {
    if (search.value == "") {
        controlObj.isSearch = false;
    } else {
        tableData = tableData.filter(item => {
            controlObj.isSearch = true;

            return (item.medical_area == search.value ||
                item.medical_company == search.value ||
                item.medical_indications == search.value ||
                item.medical_name == search.value ||
                item.medical_target == search.value ||
                item.medical_treatment == search.value)
        }
        )
    }
    console.log(tableData);

}
</script>

<style scoped lang="scss"></style>