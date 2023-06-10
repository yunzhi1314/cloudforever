<template>
  <div
    class="plans"
    style="width: 85.25vw; height: 83vh; display: block; padding: 1vw"
  >
    <el-row>
      <el-col :span="7">
        <el-row type="flex" justify="space-around" style="flex-wrap: nowrap">
          <!-- 查询及新增按钮栏 -->
          <el-input
            v-model="search"
            prefix-icon="Search"
            placeholder="请输入查询内容"
          ></el-input>
          <el-button
            type="primary"
            icon="Search"
            style="margin-left: 1vw"
            @click="query"
            >查询</el-button
          >
          <el-button type="success" @click="addTable">
            <el-icon><FolderAdd /></el-icon>
            <span>新增菜单</span>
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <!-- 通过搜索控制展示的数据是搜索内容还是初始数据 -->
    <el-table
      :data="isSearch ? searchData : newData"
      style="margin-top: 3vh"
      height="70vh"
      row-key="id"
    >
      <el-table-column label="药物名称" prop="medical_name"></el-table-column>
      <el-table-column
        label="所属公司"
        prop="medical_company"
      ></el-table-column>
      <el-table-column label="靶向" prop="medical_target"></el-table-column>
      <el-table-column
        label="线数"
        prop="medical_indications"
      ></el-table-column>
      <el-table-column
        label="治疗方式"
        prop="medical_treatment"
      >
      </el-table-column>
      <el-table-column label="区域" prop="medical_area"></el-table-column>
      <el-table-column label="操纵">
        <template #default="scope">
          <el-button
            type="text"
            size="mini"
            style="font-size: 12px"
            @click="addTable"
            >新增</el-button
          >
          <el-button
            type="text"
            size="mini"
            style="font-size: 12px"
            @click="setMsg(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="mini"
            style="font-size: 12px"
            @click="open(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 新增菜单的遮罩层 -->
  <dialogPage>
    <div class="addMenu" @click.stop>
      <section
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3.5vh;
        "
      >
        <span>{{ isSetMsg ? "修改菜单" : "新增菜单" }}</span>

        <el-icon
          color="#aaa"
          style="cursor: pointer"
          @click="controlObj.isDialog.isAddMenu = false"
          ><Close
        /></el-icon>
      </section>
      <!-- 表单 -->
      <el-form :model="addMsg" :rules="rules" ref="ruleMenu">
        <el-form-item label="*所属公司">
          <el-select
            style="width: 100%"
            v-model="addMsg.medical_company"
            placeholder="请选择所属公司"
          >
            <el-option
              v-for="(item, index) in companies"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="药物名称" prop="medical_name" style="flex: 3">
            <el-input v-model="addMsg.medical_name" placeholder=""></el-input>
          </el-form-item>
          <div style="flex: 0.5"></div>
          <el-form-item label="靶向" prop="medical_target" style="flex: 3">
            <el-input v-model="addMsg.medical_target" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: space-between">
          <el-form-item
            label="线数"
            prop="medical_indications"
            style="flex: 2.5"
          >
            <el-input
              v-model="addMsg.medical_indications"
              placeholder=""
            ></el-input>
          </el-form-item>
          <div style="flex: 0.5"></div>
          <el-form-item
            label="治疗方式"
            prop="medical_treatment"
            style="flex: 3.25"
          >
            <el-input
              v-model="addMsg.medical_treatment"
              placeholder=""
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="*区域">
          <el-radio-group v-model="addMsg.medical_area">
            <el-radio label="中国" />
            <el-radio label="国际" />
          </el-radio-group>
        </el-form-item>
        <el-form-item class="btns">
          <div style="flex: 1"></div>
          <el-button @click="cancel"> 取消</el-button>
          <el-button type="primary" @click="submitForm(ruleMenu)">
            {{ isSetMsg ? "修改" : "新增" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </dialogPage>

  <!-- 点击删除的遮罩层 -->
</template>

<script>
import { ref, provide, reactive, toRefs, h } from "vue";
import homePageCSS from "@/public/database/homePage.scss";
import { dealTree } from "@/hooks/database/menuPage";
import controlObj from "@/hooks/controls";
import { addMenu, setMenu, delMenu } from "@/api/database/menu";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "menuPage",
  setup() {
    // 用户搜索的内容
    let search = ref("");
    // 是否开启了搜索
    let isSearch = ref(false);
    // 元数据--> 提供搜索功能
    let dataList = ref(
      JSON.parse(sessionStorage.getItem("basicMedical")).basicMedical
    );
    // 搜索内容展示
    let searchData = ref("");

    // 查询
    function query() {
      // 开启搜索
      isSearch.value = true;

      // 过滤符合条件的搜索内容
      searchData.value = dataList.value.filter(
        (item) =>
          item.medical_area == search.value ||
          item.medical_company == search.value ||
          item.medical_indications == search.value ||
          item.medical_name == search.value ||
          item.medical_target == search.value ||
          item.medical_treatment == search.value ||
          search.value == ""
      );

      // 如果用户未输入搜索内容，内容展示为初始树数据
      if (search.value == "") {
        isSearch.value = false;
      }
    }

    provide("controlDialog", "isAddMenu");

    // 验证表单
    let ruleMenu = ref();
    // 表单的内容
    let addMsg = reactive({
      medical_name: "",
      medical_company: "",
      medical_target: "",
      medical_indications: "",
      medical_treatment: "",
      medical_area: "",
      id: "",
    });

    // 表单验证规则
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
    });

    // 新增内容
    function addTable() {
      controlObj.isDialog.isAddMenu = true;

      // 打开新增的表单时，清空所有遮罩层的内容
      Reflect.ownKeys(addMsg).forEach((key) => {
        Reflect.set(addMsg, key, "");
      });
    }

    // 修改内容
    // 声明一个修改的开关
    let isSetMsg = ref(false);

    // 修改按钮的函数
    function setMsg(item) {
      // 令表格变成修改的表格，开启修改开关
      isSetMsg.value = true;

      // 将原本的内容渲染到修改的表格上来
      Reflect.ownKeys(addMsg).forEach((key) => {
        Reflect.set(addMsg, key, item[key]);
      });

      // 打开遮罩层
      controlObj.isDialog.isAddMenu = true;
    }

    // 取消遮罩层
    function cancel() {
      controlObj.isDialog.isAddMenu = false;
      isSetMsg.value = false;
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

    // 提交表单
    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          controlObj.isDialog.isAddMenu = false;

          // 根据修改的开关来决定是递交修改请求还是新增内容的请求
          isSetMsg.value ? setMenu(addMsg) : addMenu(addMsg);

          // 将修改的开关关闭
          isSetMsg.value = false;
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    return {
      search,
      homePageCSS,
      dataList,
      searchData,
      query,
      isSearch,
      controlObj,
      addMsg,
      // 树数据 --> 表格默认初始视图
      ...toRefs(dealTree()),
      rules,
      submitForm,
      ruleMenu,
      // 新增内容
      addTable,
      // 修改内容
      setMsg,
      isSetMsg,
      // 取消遮罩层
      cancel,
      open,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 4vh;
}
</style>
