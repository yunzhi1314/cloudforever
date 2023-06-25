<template>
  <div>
    <!-- 第一行 -->
    <el-row>
      <el-col :span="7">
        <el-row type="flex" justify4="space-around" style="flex-wrap: nowrap;">
          <el-input placeholder="请输入查询内容"
          v-model="search"
          plafix-icon="Search"></el-input>
          <el-button type="primary"
          icon="Search"
          style="margin-left:1vw">查询</el-button>
          <el-button type="success">
            <el-icon><FolderAdd /></el-icon>
            <span>新增菜单</span>
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <!-- 通过搜索控制展示的数据是搜索内容还是初始数据 -->
    <el-table style="margin-top: 3vh;" height="60vh">
      <el-table-column label="药物名称"></el-table-column>
      <el-table-column label="所属公司"></el-table-column>
      <el-table-column label="应对癌症"></el-table-column>
      <el-table-column label="入组人数"></el-table-column>
      <el-table-column label="ORR"></el-table-column>
      <el-table-column label="OS"></el-table-column>
      <el-table-column label="PFS"></el-table-column>
      <el-table-column label="TREE"></el-table-column>
      <el-table-column label="线数"></el-table-column>
      <el-table-column label="研发管线"></el-table-column>
      <el-table-column label="操纵"></el-table-column>
      <template>
        <el-button type="text" size="mini" style="font-size: 12px;">
          修改
        </el-button>
        <el-button type="text" size="mini" style="font-size: 12px;">
          删除
        </el-button>
      </template>
    </el-table>

    <!-- 分页 -->
    <div style="display: flex;justify-content: center;margin-top: 5vh;">
    <el-pagination 
    :total="isSearch ? searchData.length : dataList.length"/>
  </div>
  </div>

  <!-- 遮罩层 -->
  <dialogPage>
    <div>
      <section>
        <span></span>
        <el-icon>
          <Close />
        </el-icon>
      </section>
      <!-- 表单 -->
      <el-form>
        <el-from-item lable="*所属公司">
          <el-select placeholder="请选择所属公司">
            <el-option></el-option>
          </el-select>
        </el-from-item>
        <!--  -->
        <div>
          <el-from-item lable="*药物名称">
            <el-input placeholder="请填写药物名称"></el-input>
          </el-from-item>
        </div>
        <!--  -->
        <div>
          <el-from-item lable="应对癌症">
            <el-input placeholder="请填写应对癌症"></el-input>
          </el-from-item>
        </div>
        <!--  -->
        <div>
          <el-from-item lable="入组人数">
            <el-input placeholder="请填写药物名称"></el-input>
          </el-from-item>
          <div>
            <el-from-item lable="ORR">
              <el-input placeholder=""></el-input>
            </el-from-item>
          </div>
        </div>
        <!--  -->
        <div>
          <el-from-item lable="OS">
            <el-input placeholder=""></el-input>
          </el-from-item>
          <div></div>
          <el-from-item lable="PFS">
            <el-input placeholder=""></el-input>
          </el-from-item>
        </div>
        <!--  -->
        <div>
          <el-from-item lable="TREE">
            <el-input placeholder=""></el-input>
          </el-from-item>
          <div></div>
          <el-from-item lable="line">
            <el-input placeholder=""></el-input>
          </el-from-item>
        </div>
        <!--  -->
        <el-form-item label="*研发管线">
          <el-radio-group>
            <el-radio label="I" />
            <el-radio label="II" />
            <el-radio label="III" />
            <el-radio label="IV" />
          </el-radio-group>
        </el-form-item>
        <!--  -->
        <el-from-item>
          <div></div>
          <el-button type=""></el-button>
          <el-button type=""></el-button>
        </el-from-item>
      </el-form>
    </div>
  </dialogPage>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "rolePage",
  setup() {
// 用户搜索内容
let search =ref('');
// 是否开启搜索
let isSearch = ref(false)
// 元数据  提供搜索
let dataList = ref(
  // JSON.parse(sessionStorage.getItem())
)
    return {
      search,     //用户搜索绑定
      isSearch   // 是否开启搜索
    }
  }
}
</script>

<style lang="scss" scoped></style>
