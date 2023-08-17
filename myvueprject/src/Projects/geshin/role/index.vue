
    <template>
  <div class="role_box">
    <div class="role-top">
      <!-- 阴影 -->
      <div class="dash_area"></div>
      <!-- 人物图片 -->
      <img src="" alt="" />
      <!-- 分割线 -->
      <div></div>
      <!-- 侧边导航 -->
      <nav>
        <li v-for="(item, index) in arrnav" :key="index">
          {{ item }}
        </li>
      </nav>
      <!-- 中间内容 -->
      <div>
        <section>
          <span>琴</span>
        </section>
        <!-- 语音播报 -->
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
          <!-- 开关 -->
          <el-switch
            v-model="value3"
            inline-prompt
            active-text="中"
            inactive-text="日"
          />
        </div>
        <!-- 文本框 -->
        <section></section>
      </div>
    </div>
    <!-- 底部轮播 -->
    <div class="role_footer">
      <img src="" alt="" />
      <!-- 轮播图 -->
      <div></div>
      <img src="" alt="" />
    </div>
  </div>
</template>

    <script setup lang="ts">
import { ref } from 'vue';
 let value3 = ref(true)   
let arrnav = ['蒙德城', '璃月港', '稻妻城', '须婗城', '敬请期待']
let arrobj = [
  {
    cty: '蒙德城',
    mengdec: [
      {
        img1: '图片1',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片2',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片3',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片4',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片5',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片6',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片7',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片8',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片9',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片10',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片11',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片12',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      },
      {
        img1: '图片13',
        name: '琴',
        cv: '林淑',
        title: '文字',
        title1: '风啊',
        title2: '回应我吧'
      }
    ]
  }
]
</script>
    
    <style scoped lang="scss">
.role_box {
  width: 100vw;
  height: 130vh;
  background-color: rosybrown;
  position: relative;

  // 阴影模块
  .dash_area {
    position: absolute;
    width: 40vw;
    height: 130vh;
    background-color: rgba(0, 0, 0, 0.4);
    transform: skewX(35deg);
    left: 10vw;
  }
  .role-top {
    display: flex;
    // 分割线
    > div:nth-of-type(2) {
      position: relative;
      left: 3.5vw;
      height: 130vh;
      border-left: 1px solid rgba(255, 255, 255, 0.7);
    }
    // 导航
    nav {
      list-style: none;
      width: 23vw;
      height: 50vh;
      margin-top: 13vh;
      li {
        margin-top: 3vh;
      }
    }
    // 人物信息
    > div:nth-of-type(3) {
      margin-top: 10vh;

      > section:nth-child(1) {
        border-top: 5px solid rgb(227, 188, 140);
        width: 15vw;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 15vh;
        span {
          color: #fff;
          font-size: 3rem;
          margin-left: 2vw;
          margin-top: 2vh;
        }
      }
      // 语音播报
      > div {
        display: flex;
        div:nth-child(1) {
          width: 20vw;
          height: 2.5vh;
          color: #fff;
          background-color: rgb(227, 188, 140);
          position: relative;
        }
      }
    }
  }
}
</style>
