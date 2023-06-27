<template>
    <div class="plans">
        <!-- 查询新增按纽栏 -->
        <el-row>
            <el-col :span="7">
                <el-row type="flex" justify="space-around" style="flex-wrap:nowrap;">
                    <el-input v-model="search" prefix-icon="Search" placeholder="请输入查询内容"></el-input>
                    <el-button type="primary" icon="Search" style="margin-left: 1vw;" @click="query">查询</el-button>
                    <el-button type="success" @click="addTable">
                        <el-icon>
                            <FolderAdd />
                        </el-icon>
                        <span>新增菜单</span>
                    </el-button>
                </el-row>

            </el-col>
        </el-row>
        <!-- 通过开关控制 展示的数据是搜索内容还是初始内容  -->
        <el-table :data="isSearch ? searchdata : newData" style="margin-top: 3vh" height="70vh" row-key="id">
            <el-table-column prop="medical_name" label="药物名称" width="180" />
            <el-table-column prop="medical_company" label="所属公司" width="180" />
            <el-table-column prop="medical_indications" label="应对癌症" width="180" />
            <el-table-column label="入组人数" prop="medical_enrollees_population" width="180" />
            <el-table-column label="ORR" prop="medical_ORR"></el-table-column>
            <el-table-column label="OS" prop="medical_OS"></el-table-column>
            <el-table-column label="PFS" prop="medical_PFS"></el-table-column>
            <el-table-column label="TREE" prop="medical_TREE"></el-table-column>
            <el-table-column label="线数" prop="medical_line"></el-table-column>
            <el-table-column label="研发管线" prop="medical_status"></el-table-column>
            <el-table-column prop="address" label="操纵">
                <template #default="scope">
                    <el-button type="text" style="font-size:12px" @click="addTable">新增</el-button>
                    <el-button type="text" style="font-size:12px" @click="setMsg(scope.row)">修改</el-button>
                    <el-button type="text" style="font-size:12px" @click="open(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 分页 -->
    <div>
        <el-pagination background :total="isSearch ? searchdata.length : dataList.length" v-model:page-size="pageSize"
            v-model:current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :small="false"
            layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
            @size-change="handleSizeChange"></el-pagination>
    </div>

    <!-- 新增菜单的遮罩层 -->
    <dialogPage>
        <!--@click.stop阻止事件冒泡  -->
        <div class="addmenu" @click.stop>
            <section class="menusection">
                <span> {{ isSetMsg ? "修改菜单" : "新增菜单" }}</span>
                <el-icon color="#aaa">
                    <Close />
                </el-icon>
            </section>
            <!--  表单  -->
            <el-form :model="addMsg" :rules="rules" ref="ruleMenu">
                <el-form-item label=" *所属公司 ">
                    <el-select v-model="addMsg.medical_company" placeholder="请选择所属公司" style="width: 100%;">
                        <el-option v-for="(item, index) in companies" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <div style="display: flex; justify-content: space-between;">
                    <el-form-item label="药物名称" prop="medical_name" style="flex:2.85;">
                        <el-input v-model="addMsg.medical_name" placeholder="请填写药物名称"></el-input>
                    </el-form-item>
                    <div style="flex: 0.5;"></div>
                    <el-form-item label="应对癌症" prop="medical_indications" style="flex:3;">
                        <el-input v-model="addMsg.medical_target" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <el-form-item label="线数" prop="medical_indications" style="flex:2.8;">
                        <el-input v-model="addMsg.medical_indications" placeholder="请填写应对癌症"></el-input>
                    </el-form-item>
                    <div style="flex:0.5;"></div>
                    <el-form-item label="入组人数" prop="medical_enrollees_population" style="flex:2.5;">
                        <el-input v-model="addMsg.medical_enrollees_population" placeholder=""></el-input>
                    </el-form-item>
                    <div style="flex: 0.5"></div>
                    <el-form-item label="ORR" prop="medical_ORR" style="flex: 3.25">
                        <el-input v-model="addMsg.medical_ORR" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <!--  单选框   *-->
                <div style="display: flex; justify-content: space-between">
                    <el-form-item label="OS" prop="medical_OS" style="flex: 2.5">
                        <el-input v-model="addMsg.medical_OS" placeholder=""></el-input>
                    </el-form-item>
                    <div style="flex: 0.5"></div>
                    <el-form-item label="PFS" prop="medical_PFS" style="flex: 3.25">
                        <el-input v-model="addMsg.medical_PFS" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div style="display: flex; justify-content: space-between">
                    <el-form-item label="TREE" prop="medical_TREE" style="flex: 2.5">
                        <el-input v-model="addMsg.medical_TREE" placeholder=""></el-input>
                    </el-form-item>
                    <div style="flex: 0.5"></div>
                    <el-form-item label="line" prop="medical_line" style="flex: 3.25">
                        <el-input v-model="addMsg.medical_line" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="*研发管线">
                    <el-radio-group v-model="addMsg.medical_status">
                        <el-radio label="I" />
                        <el-radio label="II" />
                        <el-radio label="III" />
                        <el-radio label="IV" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="btns">
                    <div style="flex: 1"></div>
                    <el-button @click="cancel"> 取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleMenu)">
                        {{ isSetMsg ? "修改" : "新增" }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </dialogPage>
</template>

<script>
import tablePageCss from "@/public/database/menuPage.scss"
import { ref, provide, reactive, toRefs, h } from "vue"
import control from "@/hook/personalCenter/control"
// import homePageCss from "@/public/database/homePage.scss"
import { dealTree } from "@/hook/database/menuPage"
import { addMenu, setMenu, delMenu } from "@/api/user/forTable.js"
import { ElMessage, ElMessageBox } from "element-plus";
export default {
    name: "rolePage",
    setup() {
        // 测试
        // const input = ref('')
        // 搜索的内容
        let search = ref("")
        // 是否开启搜索
        let isSearch = ref(false)
        //    将会话存储中的数据转换成响应式数据
        let dataLister = ref(JSON.parse(sessionStorage.getItem("basicMedical")).basicMedical)
        // 需要渲染到页面的数据
        let { newData, companies } = reactive(dealTree())
        // newData.pop(newData)//删除了这一项空白的内容 
        let searchdata = ref("")
        console.log('ingore', newData)



        // 查询
        function query() {
            // 是否展开搜索
            isSearch.value = true
            // 过滤符合条件的搜索内容
            searchdata.value = dataLister.value.filter(
                (item) =>
                    item.company == search.value ||
                    item.medical_ORR == search.value ||
                    item.medical_OS == search.value ||
                    item.medical_PFS == search.value ||
                    item.medical_TREE == search.value ||
                    item.medical_enrollees_population == search.value ||
                    item.medical_indications == search.value ||
                    item.medical_line == search.value ||
                    item.medical_name == search.value ||
                    item.medical_status == search.value ||
                    search.value == ""
            )
            if (search.value == "") {
                isSearch.value = ref(false) //转为响应式

            }
        }

        provide('controlDialog', 'isRoleAddMenu') //新增菜单按钮的遮罩层
        let ruleMenu = ref()


        let addMsg = reactive({  //选择所选公司
            company: "",
            id: "",
            medical_ORR: "",
            medical_OS: "",
            medical_PFS: "",
            medical_TREE: "",
            medical_enrollees_population: "",
            medical_indications: "",
            medical_line: "",
            medical_name: "",
            medical_status: "",

        })

        // 表单验证规则
        let rules = reactive({
            //remove all the useless data
        })
        let nameArr = ["公司信息", "ORR信息", "OS信息", "PFS信息",
            "TREE信息", "入组人数信息", "应对癌症信息", "线数信息", "药品信息", "研发管线信息"]
        // 提交表单

        //加入表单验证规则
        Reflect.ownKeys(addMsg).forEach((item, index) => {
            Reflect.set(rules, item, {
                required: true,
                message: `请输入${nameArr[index]}`,
                trigger: "blur",
            })
        })

        function addTable() { //
            control.isDialog.isAddMenu = true //打开遮罩层
            // 打开新增的表单时，清空所有遮罩层的内容
            Reflect.ownKeys(addMsg).forEach((key) => {
                Reflect.set(addMsg, key, "");
            });
        }

        // 修改开关
        let isSetMsg = ref(false)

        // 表单首页的修改信息 
        function setMsg(item) {
            // 将原本的内容渲染到修改的表格上来
            Reflect.ownKeys(addMsg).forEach(key => {
                Reflect.set(addMsg, key, item[key])
            })
            isSetMsg.value = true
            control.isDialog.isAddMenu = true //打开遮罩层
        }

        // 点击遮罩层取消按钮 关闭遮罩层
        function cancel() {
            control.isDialog.isAddMenu = false //打开遮罩层
            isSetMsg.value = false
        }

        // 删除提示框
        const open = (item) => {
            // 这个函数本质上返回的是promise函数
            ElMessageBox(
                {
                    // 提示框标题
                    title: "删除信息",
                    // 提示框渲染的信息，用h函数渲染
                    // h(HTMLCollaption:string,CSS:object,html内容:array | string):htmlTag
                    message: h("p", null, [
                        h("span", null, "你确认删除这项信息吗？")
                    ]),
                    // 显示取消按钮
                    showCancelButton: true,
                    // 确认按钮的文本
                    confirmButtonText: "确认",
                    // 取消按钮的文本
                    cancelButtonText: "取消",
                    // 在关闭之前的钩子函数
                    // action是指用户的行为：用户点击了哪一个按钮
                    // instance 点击确认按钮后，提示框结束之前的加载动画
                    // done() 确认提示框的行为有无完成的标志
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            // 开启提示框确认按钮的加载动画
                            instance.confirmButtonLoading = true;
                            // 修改提示框确认按钮的文本
                            instance.confirmButtonText = "Loading...";
                            // 在结束提示框之前去进行请求
                            delMenu(item.id)
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
                        type: "info",
                        message: `删除成功`,
                    })
                }
                ).catch(err => console.log(err))
        };

        // 提交新增表单
        const submitForm = async (formEl) => {
            if (!formEl) return; //
            await formEl.validate((valid, fields) => {
                // 如果表单验证成功
                if (valid) {
                    control.isDialog.isAddMenu = false //提交成功遮罩层消失

                    // 判断是修改还是新增请求
                    isSetMsg.value ? setMenu(addMsg) : addMenu(addMsg)
                    // 将修改开关改为关闭
                    isSetMsg.value = false

                } else {
                    // 如果表单验证失败
                    console.log("error submit!!", fields);
                }
            });
        };
        // 分页
        let currentPage = ref(1);
        let pageSize = ref(10);
        // 分页数组
        let pageArr = ref([]);

        const handleSizeChange = () =>{
            currentPage.value = 1;
            pageSize.value = pageSize.value;
            query();
        }
        return {
            // 样式
            // homePageCss,
            tablePageCss,
            // 判断
            // isSearch,
            isSetMsg,
            // 变量区
            search,
            searchdata,
            // newData,
            isSearch,
            addMsg,
            // input,
            companies,
            rules,
            ruleMenu,
            // dataLister,

            // 引入其他组件 
            control,
            addMenu,
            setMenu,

            // 函数区
            query,
            submitForm,
            setMsg,
            cancel,// 点击遮罩层取消按钮 关闭遮罩层
            addTable,//点击新增的函数
            open,

            // 请求过来的数据
            ...toRefs(dealTree()),

            // 分页
            currentPage,
            pageSize
        }
    }
}
</script>

<style lang="scss" scoped></style>
