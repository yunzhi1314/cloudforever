<template>
    <div class="common-layout">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
    <router-view></router-view>
</template>
  
<script>
export default {
    name: 'databasePage',
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>