<template>
  <div class="wirpper" style="width:80vw; height:80vh;display:block;padding:1vw; background-color: white;">
    <!-- 添加查询按钮 -->
    <el-row>
      <el-col :span="7">
        <el-row class="nav" justify="space-around" style="flex-wrap: nowrap">
          <el-input v-model="search" placeholder="请输入查询内容" style="width: 60vw;" />
          <el-button icon="search" @click="query" type="primary" style="margin-left:1vw">查询</el-button>
          <el-button icon="FolderAdd" type="success" @click="addTable">新增菜单</el-button>
        </el-row>
      </el-col>
    </el-row>

    <!-- 通过搜索控制展示的数据是搜索内容还是初始数据 -->
    <el-table :data="pageArr" style="margin-top: 1vh; height: 71.5vh">
      <el-table-column :label="nameArr[0]" :prop="propArr[0]"></el-table-column>
      <el-table-column :label="nameArr[1]">
        <template #default="scope">
          <el-progress :text-inside="true" :stroke-width="30" :percentage="scope.row[propArr[1]]" />
        </template>
      </el-table-column>
      <el-table-column v-for="(item, index) in propArr.slice(2)" :key="index" :label="nameArr.slice(2)[index]"
        :prop="item" width="140"></el-table-column>
      <el-table-column label="操纵">
        <template #default="scope">
          <el-button link size="small" style="font-size: 12px;margin:0;width:28%;color:#409eff;"
            @click="setMsg(scope.row)">修改</el-button>
          <el-button link size="small" style="font-size: 12px;margin:0;width:28%;color:#409eff;"
            @click="delMsg(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="demo-pagination-block" style="display: flex; justify-content: center; height: 5vh">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
        :small="false" layout="sizes, prev, pager,next,jumper,total"
        :total="isSearch ? searchData.length : dataList.length" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
  <!-- 新增/修改菜单的遮罩层 -->
  <dialogPage>
    <div class="addMenu" @click.stop>
      <section style="
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 3.5vh;
				">
        <span>{{ isSetMsg ? "修改菜单" : "新增菜单" }}</span>
        <el-icon color="#aaa" style="cursor: pointer" @click="controlObj.isDialog.isAddMenu = false">
          <Close />
        </el-icon>
      </section>
      <!-- 表单 -->
      <el-form :model="addMsg" :rules="rules" ref="ruleMenu" style="
      width: 45vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 2vw;">
        <el-form-item :label="nameArr[1]" style="grid-column: span 2;">
          <el-select style="width:41vw;" v-model="addMsg.process" placeholder="请选择对应的研发进度">
            <el-option v-for="(item, index) in process" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item :label="nameArr[0]" :prop="propArr[0]">
            <el-input style="width:16vw;" v-model="addMsg.medical_name" :placeholder="`请填写${nameArr[0]}`"></el-input>
          </el-form-item>
        </div>
        <div v-for="(item, index) in propArr.slice(2, 4)" :key="index">
          <el-form-item :label="nameArr.slice(2, 4)[index]" :prop="item">
            <el-input style="width:16vw;" v-model="addMsg[item]"
              :placeholder="`请填写${nameArr.slice(2, 4)[index]}`"></el-input>
          </el-form-item>
        </div>
        <div v-for="(item, index) in propArr.slice(4, 6)" :key="index">
          <el-form-item :label="nameArr.slice(4, 6)[index]" :prop="item">
            <el-date-picker style="width:16vw;" v-model="addMsg[item]" type="date"
              :placeholder="`请填写${nameArr.slice(4, 6)[index]}`" />
          </el-form-item>
        </div>
        <div>
          <el-form-item :label="nameArr[6]" :prop="propArr[6]">
            <el-input style="width:16vw;" v-model="addMsg.medical_name" :placeholder="`请填写${nameArr[6]}`"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <el-form-item style="padding: 0 3vw">
          <el-button type="primary" @click="submitForm(ruleMenu)" style="margin: 0; width: 45%">
            {{ isSetMsg ? "修改" : "新增" }}</el-button>
          <div style="flex: 1"></div>
          <el-button @click="cancel" style="margin: 0; width: 45%">
            取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </dialogPage>
</template>

<script>
import { provide, ref, reactive, watch, h, toRefs } from "vue";
import { dealUser } from '@/hooks/database/userPage.js'
import menuPage from "@/public/database/menu/menuPage.scss";
import controlObj from "@/hooks/controlObj";
import { addMenu, setMenu, delMenu } from "@/api/arknight/database/menu";
// 导入弹框，删除时使用
import { ElMessage, ElMessageBox } from "element-plus";
import url from "@/api/url"
export default {
  name: "userPage",
  setup() {
    let { dataList, processList } = toRefs(dealUser())
    provide("controlDialog", "isAddMenu");
    // 用户搜索的内容
    let search = ref("");
    // 是否开启了搜索
    let isSearch = ref(false);
    // 搜索内容展示
    let searchData = ref("");
    // 查询
    function query() {
      // 开启搜索
      isSearch.value = true;
      // 过滤符合条件的搜索内容
      searchData.value = dataList.value.filter((item) =>
        Object.values(item).includes(search.value)
      );
      // 如果用户未输入搜索内容，内容展示为初始树数据
      if (search.value == "") {
        isSearch.value = false;
      }
    }
    // 验证表单
    let ruleMenu = ref();
    // 表单的内容
    let addMsg = reactive({});
    let propArr = Reflect.ownKeys(dataList.value[0]).slice(0, 7)
    propArr.forEach((item) => {
      if (item != "id") {
        Reflect.set(addMsg, item, "");
      }
    });
    //标头(汉字)
    let nameArr = ["药物名称", "研发进度", "中国入组人数", "国际入组人数", "首次公开日期", "中国FPI注册", "美国CTR认证"]
    //进度名称 最开始下拉框选择第一个
    let process = processList.value[0]
    // 表单验证规则
    let rules = reactive({})
    Reflect.ownKeys(addMsg).forEach((item, index) => {
      Reflect.set(rules, item, {
        required: true,
        message: `请输入${nameArr[index]}`,
        trigger: "blur"
      });
    });

    // 当前页
    let currentPage = ref(2);
    // 单页数量
    let pageSize = ref(10);
    // 分页数组
    let pageArr = ref([]);
    // 修改分页数量
    const handleSizeChange = () => {
      pageArr.value.splice(0, pageArr.value.length);
    };
    //修改当前页数
    const handleCurrentChange = () => {
      pageArr.value.splice(0, pageArr.value.length);
    };

    // 监视 currentPage(当前页) 和 pageSize(当前页所展示的数量)
    // 去截取对应位置的数组
    // 去渲染该数组
    watch(
      [currentPage, pageSize, isSearch],
      (newValue) => {
        pageArr.value.splice(0, pageArr.value.length)
        // 是否搜索？// 如果搜索的话，就分页搜索的结果
        newValue[2]
          ? pageArr.value.push(
            ...searchData.value.slice(
              (newValue[0] - 1) * newValue[1],
              newValue[0] * newValue[1]
            )) // 如果没有搜索，就分页元数据
          : pageArr.value.push(
            ...dataList.value.slice(
              (newValue[0] - 1) * newValue[1],
              newValue[0] * newValue[1]
            ));
      },
      { immediate: true }
    );

    // 修改内容
    // 声明一个修改的开关
    let isSetMsg = ref(false);
    // 新增菜单按钮
    function addTable() {
      controlObj.isDialog.isAddMenu = true;
      // 打开新增的表单时，清空所有遮罩层的内容
      Reflect.ownKeys(addMsg).forEach((key) => {
        Reflect.set(addMsg, key, "");
      });
    }
    // 修改按钮
    function setMsg(item) {
      // 将遮罩层变成修改内容，开启修改开关
      isSetMsg.value = true;
      // 开启遮罩层
      controlObj.isDialog.isAddMenu = true;
      // 将修改内容渲染到修改表格中
      Reflect.ownKeys(addMsg).forEach((key) => {
        Reflect.set(addMsg, key, item[key]);
      });
      //进度百分比转义成研发名称
      switch (addMsg.process) {
        case "":
          addMsg.process = ref("");
          break;
        case 20:
          addMsg.process = ref("Ia");
          break;
        case 40:
          addMsg.process = ref("Ib_II");
          break;
        case 60:
          addMsg.process = ref("III");
          break;
        case 80:
          addMsg.process = ref("NDA");
          break;
        case 100:
          addMsg.process = ref("market");
          break;
      }
    }
    // 删除按钮
    function delMsg(item) {
      // 这个函数本质上返回的是promise函数
      ElMessageBox({
        // 提示框标题
        title: "删除信息",
        // 提示框渲染的信息，用h函数渲染
        // h(HTMLCollaption:string,CSS:object,html内容:array | string):htmlTag
        message: h("p", { style: "font-size:19px;font-weight:bold;" }, "你确认删除这项信息吗？"),
        // 显示取消按钮
        showCancelButton: true,
        // 确认按钮的文本
        confirmButtonText: "确认",
        // 取消按钮的文本
        cancelButtonText: "取消",
        customClass: "MSGBOX",
        confirmButtonClass: "OKCSS",
        cancelButtonClass: "OKCSS",
        // 在关闭之前的钩子函数
        // action是指用户的行为：用户点击了哪一个按钮
        // instance 点击确认按钮后，提示框结束之前的加载动画
        // done() 确认提示框的行为有无完成的标志
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // 开启提示框确认按钮的加载动画
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";
            // 在结束提示框之前去进行请求
            delMenu(url.database.user.delMenu, item.id);
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
        }
      })
        .then(() => {
          ElMessage({
            type: "info",
            message: `删除成功`
          });
        })
        .catch((err) => console.log(err));
    }
    // 遮罩层确定按钮  -- 新增或修改
    // 提交表单
    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          controlObj.isDialog.isAddMenu = false;
          //研发名称转义成研发百分比
          process.forEach((item, index) => {
            switch (addMsg.process) {
              case item:
                //根据顺序 阶段*20累加
                addMsg.process = ref((index + 1) * 20)
                break
            }
          })

          // 根据修改的开关来决定是递交修改请求还是新增内容的请求
          isSetMsg.value ? setMenu(url.database.user.setMenu, addMsg) : addMenu(url.database.user.addMenu, addMsg);

          // 将修改的开关关闭
          isSetMsg.value = false;
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    // 取消遮罩层
    function cancel() {
      controlObj.isDialog.isAddMenu = false;
      isSetMsg.value = false;
    }


    return {
      /* 样式 */
      menuPage,
      /* 搜索框内容 */
      search,
      /* 判断是否开始搜索 */
      isSearch,
      /* 修改的开关 */
      isSetMsg,
      /* 搜索框输入时筛选的数据内容 */
      searchData,
      /* 元数据 */
      dataList,
      /* 中文 */
      nameArr,
      /* 英文 */
      propArr,
      /* 验证表单 */
      ruleMenu,
      /* 表单的内容 */
      addMsg,
      //研发进度
      process,
      /* 表单验证规则 */
      rules,
      /* 当前页 */
      currentPage,
      /* 当前页所展示的数量 */
      pageSize,
      /* 分页数组 */
      pageArr,
      /* 按钮集合 */
      controlObj,
      /* 查询 */
      query,
      /* 修改分页数量 */
      handleSizeChange,
      /* 修改当前页数 */
      handleCurrentChange,
      /* 修改当前页数 */
      addTable,
      /* 修改按钮 */
      setMsg,
      /* 删除按钮 */
      delMsg,
      /* 提交表单 */
      submitForm,
      /* 取消按钮 */
      cancel
    }
  }
}
</script>

<style lang="scss" scoped></style>
