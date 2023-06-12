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
    <el-table :data="pageArr" style="margin-top: 3vh" height="60vh">
      <el-table-column v-for="(item,index) in propArr" :label="nameArr[index]" :prop="item"
      :key="index" :fixed="index==0" ></el-table-column>
      <el-table-column label="操纵">
        <template #default="scope">
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

    <!-- 分页 -->
    <div
      class="demo-pagination-block"
      style="display: flex; justify-content: center; margin-top: 5vh"
    >
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="false"
        layout="sizes, prev, pager,next,jumper,total"
        :total="isSearch ? searchData.length : dataList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <!-- 新增菜单的遮罩层 -->
  <dialogPage>
    <div class="addMenu" @click.stop style="height: 65vh">
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
            v-model="addMsg.company"
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
            <el-input
              v-model="addMsg.medical_name"
              placeholder="请填写药物名称"
            ></el-input>
          </el-form-item>
          <div style="flex: 0.5"></div>
          <el-form-item
            label="应对癌症"
            prop="medical_indications"
            style="flex: 3"
          >
            <el-input
              v-model="addMsg.medical_indications"
              placeholder="请填写应对癌症"
            ></el-input>
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: space-between">
          <el-form-item
            label="入组人数"
            prop="medical_enrollees_population"
            style="flex: 2.5"
          >
            <el-input
              v-model="addMsg.medical_enrollees_population"
              placeholder=""
            ></el-input>
          </el-form-item>
          <div style="flex: 0.5"></div>
          <el-form-item label="ORR" prop="medical_ORR" style="flex: 3.25">
            <el-input v-model="addMsg.medical_ORR" placeholder=""></el-input>
          </el-form-item>
        </div>
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
            {{ isSetMsg ? "修改" : "新增" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </dialogPage>

  <!-- 点击删除的遮罩层 -->
</template>

<script>
import { ref, provide, reactive, h, watch } from "vue";
import homePageCSS from "@/public/database/homePage.scss";
import controlObj from "@/hooks/controls";
import { addMenu, setMenu, delMenu } from "@/api/database/role";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "departmentPage",
  setup() {
    // 用户搜索的内容
    let search = ref("");
    // 是否开启了搜索
    let isSearch = ref(false);
    // 元数据--> 提供搜索功能
    let dataList = ref(
      JSON.parse(sessionStorage.getItem("naweiCompany")).naweiCompany
    );
    dataList.value = dataList.value.map((item,index) => {
      item.year = index % 2 == 1 ? 
      (2019+index/2).toFixed(0).toString() + "年6月" :  
      (2019+index/2).toFixed(0).toString() + "年12月"
      return item
    })

    // 搜索内容展示
    let searchData = ref("");
    // 查询
    function query() {
      // 开启搜索
      isSearch.value = true;

      // 过滤符合条件的搜索内容
      searchData.value = dataList.value.filter(
        (item) => Object.values(item).includes(search) || search.value == ""
      );

      // 如果用户未输入搜索内容，内容展示为初始树数据
      if (search.value == "") {
        isSearch.value = false;
      }
    }

    provide("controlDialog", "isRoleAddMenu");

    // 验证表单
    let ruleMenu = ref();
    // 表单的内容
    let addMsg = reactive({});
    Reflect.ownKeys(dataList.value[0]).forEach((item) => {
      Reflect.set(addMsg, item, "");
    });

    let propArr = Reflect.ownKeys(dataList.value[0])
    let item = propArr.pop()
    propArr.unshift(item)
    console.log(propArr)
    // 表单验证规则
    let rules = reactive({});
    let nameArr = [
      "经营活动现金流量",
      "销售商品、提供劳务收到的现金",
      "现金流量表",
      "未分配利润",
      "利润公积",
      "资本公积",
      "09年增长率",
      "每股资本公积",
      "所有者权益合计",
      "08年增长率",
      "负债合计",
      "非流动负债",
      "流动负债",
      "07年增长率",
      "资产总计",
      "长期股权投资",
      "固定资产",
      "流动资产",
      "资产负债表",
      "EBITDA",
      "EBIT",
      "研发费用",
      "06年增长率",
      "非经常性损益",
      "非经常性收益及损失",
      "05年增长率",
      "净利润（税后）",
      "02年增长率",
      "营业利润",
      "总成本",
      "01年增长率",
      "总收入",
      "利润表摘要",
      "04年增长率",
      "税前利润",
      "净利润",
      "03年增长率",
      "财务ID",
      "财务状态",
    ];
    nameArr.unshift("年份")
    // 加入表单验证规则
    Reflect.ownKeys(addMsg).forEach((item, index) => {
      Reflect.set(rules, item, {
        required: true,
        message: `请输入${nameArr[index]}`,
        trigger: "blur",
      });
    });


    // 新增内容
    function addTable() {
      controlObj.isDialog.isRoleAddMenu = true;

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
      controlObj.isDialog.isRoleAddMenu = true;
    }

    // 取消遮罩层
    function cancel() {
      controlObj.isDialog.isRoleAddMenu = false;
      isSetMsg.value = false;
    }

    // 删除提示框
    const open = (item) => {
      // 这个函数本质上返回的是promise函数
      ElMessageBox({
        // 提示框标题
        title: "删除信息",
        // 提示框渲染的信息，用h函数渲染
        // h(HTMLCollaption:string,CSS:object,html内容:array | string):htmlTag
        message: h("p", null, [h("span", null, "你确认删除这项信息吗？")]),
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
            delMenu(item.id);
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
      })
        .then(() => {
          ElMessage({
            type: "info",
            message: `删除成功`,
          });
        })
        .catch((err) => console.log(err));
    };

    // 提交表单
    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          controlObj.isDialog.isRoleAddMenu = false;

          // 根据修改的开关来决定是递交修改请求还是新增内容的请求
          isSetMsg.value ? setMenu(addMsg) : addMenu(addMsg);

          // 将修改的开关关闭
          isSetMsg.value = false;
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    // 分页
    let currentPage = ref(1);
    let pageSize = ref(10);
    // 分页数组
    let pageArr = ref([]);

    const handleSizeChange = () => {
      pageArr.value.splice(0, pageArr.value.length);
    };
    const handleCurrentChange = () => {
      pageArr.value.splice(0, pageArr.value.length);
    };
    // 监视 currentPage(当前页) 和 pageSize(当前页所展示的数量)
    // 去截取对应位置的数组
    // 去渲染该数组
    watch(
      [currentPage, pageSize, isSearch],
      (newValue) => {
        // 是否搜索？
        console.log(newValue[2])
        newValue[2]? // 如果搜索的话，就分页搜索的结果
            pageArr.value.push(
              ...searchData.value.slice(
                (newValue[0] - 1) * newValue[1],
                newValue[0] * newValue[1]
              )
            )
          : // 如果没有搜索，就分页元数据
            pageArr.value.push(
              ...dataList.value.slice(
                (newValue[0] - 1) * newValue[1],
                newValue[0] * newValue[1]
              )
            );
        console.log(pageArr.value);
      },
      { immediate: true }
    );

    return {
      search,
      homePageCSS,
      dataList,
      searchData,
      query,
      isSearch,
      controlObj,
      addMsg,
      rules,
      submitForm,
      ruleMenu,
      // 新增内容
      addTable,
      // 修改内容
      isSetMsg,
      setMsg,
      // 取消遮罩层
      cancel,
      open,
      // 分页
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      // 分页数组
      pageArr,
      propArr,
      nameArr
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 4vh;
}
</style>
