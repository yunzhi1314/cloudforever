    <template>
  <div class="spots">
    <!-- 米游社头部 -->
    <header class="spots_header">
      <section class="header_left">
        <img src="" alt="" />
        <span>米游社</span>
        <span>|</span>
        <span>米游社·原神</span>
        <el-icon><ArrowUpBold /></el-icon>
      </section>
      <section>
        <nav>
          <li></li>
          <span>更多</span>
          <el-icon><ArrowDownBold /></el-icon>
        </nav>
      </section>
      <section>
        <!-- <el-button size="large" :icon="Search" round>Search</el-button> -->
        <div>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
      </section>
    </header>
    <!-- 内容 -->
    <main>

    </main>
    <!-- 底部 -->
    <footer>

    </footer>
  </div>
</template>

<script setup lang="ts">
// import { Search } from '@element-plus/icons-vue'

</script>
    
<style scoped lang="scss">

.spots{
  width: 100vw;
  .spots_header{
  height: 5vh;
  width: 100vw;
  color:#fff;
  background-color: rgb(31, 34, 51);
  .header_left{
    display: flex;
  }
 }

}

</style>
