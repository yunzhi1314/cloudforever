
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
        <li
          v-for="(item, index) in arrNav"
          :key="index"
          :style="
            item.isNav
              ? 'background-image: linear-gradient(to left,rgba(0,0,0,0),rgba(0,0,0,0.4),rgba(0,0,0,0.6))'
              : ''
          "
          @click="openNav(index)"
        >
          <span class="canvas"></span>
          <span>{{ item.cty }}</span>
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
            <section></section>
            <section>
              <span></span>
            </section>
            <section>
              <span>cv:</span>
              <span>琴</span>
            </section>
            <section>
              <svg
                t="1692172280691"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5586"
                width="30"
                height="30"
              >
                <path
                  d="M515.041727 670.617766c91.584167 0 166.095647-74.504255 166.095647-166.095646V229.350568c0-91.584167-74.51148-166.095647-166.095647-166.095647-91.598617 0-166.102872 74.51148-166.102871 166.095647V504.52212c0 91.591392 74.504255 166.095647 166.102871 166.095646z"
                  fill="#ffffff"
                  p-id="5587"
                ></path>
                <path
                  d="M801.643237 874.001665H558.391759v-45.423608c161.507768-21.313766 286.60151-159.788217 286.60151-327.01819a43.350032 43.350032 0 0 0-86.700064 0c0 134.124998-109.12648 243.251478-243.258703 243.251479-134.124998 0-243.244253-109.12648-243.244253-243.251479a43.350032 43.350032 0 0 0-86.700063 0c0 167.229972 125.100967 305.711649 286.601509 327.01819v45.423608H228.440217a43.350032 43.350032 0 0 0 0 86.700064h573.20302a43.350032 43.350032 0 0 0 0-86.700064z"
                  fill="#ffffff"
                  p-id="5588"
                ></path>
              </svg>
            </section>
          </div>
          <!-- 开关 -->
          <section class="el-switch">
            <span
              class="off"
              @click="isback = !isback"
              :style="isback ? 'left:3px' : 'left:50px '"
            ></span>
            <span>中</span><span>日</span>
          </section>
        </div>
        <!-- 文本框 -->
        <div class="words">
          <section>
            <span>
              <span></span>
            </span>
          </section>
          <section>
            <span>文本</span>
          </section>
        </div>
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
import { reactive, ref } from 'vue'
import { getRolesdata } from '@/utils/RolesData'
import { useStore } from 'vuex'

//请求角色数据
getRolesdata()
interface Date {
  city: string
  key: string
  bg: Array<string>
  character: Array<Character>
}
interface Character {
  title: string
  name: string
  attr: string
  introduce: string
  roleImg: string
  sentence: string
  cv: Array<Cv>
}
interface Cv {
  audio: Array<string>
  name: string
}

let { dataList } = useStore().state.childrenStor.requestData
let newData = reactive<Date>({
  city: '',
  key: '',
  bg: [''],
  character: [
    {
      title: '',
      name: '',
      attr: '',
      introduce: '',
      roleImg: '',
      sentence: '',
      cv: [
        {
          audio: [''],
          name: ''
        }
      ]
    }
  ]
})
newData = dataList
// 导航名
if(dataList[0]){
  console.log("333",newData);
  
}




//点击导航栏
function openNav(index: number = 0) {
  for (let i = 0; i < arrNav.length; i++) {
    if (i == index) {
      arrNav[i].isNav = true
    } else {
      arrNav[i].isNav = false
    }
  }
}

//控制角色导航栏开关
let isNav = ref<boolean>(false)
// 控制播音开关
let isback = ref(false)
// 渲染导航栏的数据
interface Nav {
  isNav: boolean
  cty: string
}
let arrNav = reactive<Array<Nav>>([
  {
    isNav: false,
    cty: '蒙德城'
  },
  {
    isNav: false,
    cty: '璃月港'
  },
  {
    isNav: false,
    cty: '稻妻城'
  },
  {
    isNav: false,
    cty: '须婗城'
  },
  {
    isNav: false,
    cty: '敬请期待'
  }
])
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  height: 122vh;
  background-color: rosybrown;
  position: relative;

  // 阴影模块
  .dash_area {
    position: absolute;
    width: 40vw;
    height: 122vh;
    background-color: rgba(0, 0, 0, 0.4);
    transform: skewX(35deg);
    left: 14vw;
    z-index: 1;
    left: 14vw;
    z-index: 1;
  }
  .role-top {
    display: flex;
    height: 90vh;
    // 分割线
    > div:nth-of-type(2) {
      position: relative;
      left: 5vw;
      height: 122vh;
      border-left: 1px solid rgba(255, 255, 255, 0.7);
    }
    // 导航
    nav {
      list-style: none;
      width: 17vw;
      height: 50vh;
      transform: translateY(20px);
      margin-top: 20vh;
      li {
        height: 7vh;
        display: flex;
        align-items: center;
        cursor: pointer;
        > span:nth-child(1) {
          margin-left: 4.8vw;
          color: #fff;
          width: 5px;
          height: 5px;
          background-color: #fff;
          transform: rotate(45deg);
        }
        > span:nth-child(2) {
          margin-left: 2vw;
          font-size: 1.2rem;
          color: #fff;
        }
        height: 7vh;
        display: flex;
        align-items: center;
        cursor: pointer;
        > span:nth-child(1) {
          margin-left: 4.8vw;
          color: #fff;
          width: 5px;
          height: 5px;
          background-color: #fff;
          transform: rotate(45deg);
        }
        > span:nth-child(2) {
          margin-left: 2vw;
          color: #fff;
        }
      }
    }
    // 人物信息
    > div:nth-of-type(3) {
      margin-top: 18vh;
      margin-left: 2vw;

      > section:nth-child(1) {
        border-top: 5px solid rgb(227, 188, 140);
        width: 10vw;
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
          height: 7vh;
          color: #fff;
          background-color: rgb(227, 188, 140);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          > section:nth-child(1) {
            position: absolute;
            width: 0px;
            height: 0px;
            border: 10px solid transparent;
            border-bottom: 10px solid rgba(0, 0, 0, 0.4);
            transform: rotateZ(-47deg);
            left: -8.7px;
            top: -8.5px;
          }
          > section:nth-child(2) {
            width: 15px;
            height: 15px;
            border: 1px solid #000000;
            transform: rotateZ(45deg);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 2vw;
            > span {
              width: 8px;
              height: 8px;
              background-color: #000000;
            }
          }
          > section:nth-child(3) {
            width: 8vw;
            transform: translateX(-40px);
            > span:nth-of-type(1) {
              margin-left: 2vw;
            }
            > span {
              font-size: 1.5rem;
              color: #27353d;
            }
          }
          > section:nth-child(4) {
            width: 3.5vw;
            height: 7vh;
            border: 3px solid #9f7b4b;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.4);
            cursor: pointer;
            z-index: 1;
            fill-opacity: (0.6);
          }
          > section:nth-child(4):hover {
            fill-opacity: (1);
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
        // 开关
        .el-switch {
          height: 4.3vh;
          margin-left: 3vw;
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #9f7b4b;
          width: 5vw;
          border-radius: 5vw;
          margin-top: 1.3vh;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          > section:nth-child(1) {
            position: absolute;
            width: 0px;
            height: 0px;
            border: 10px solid transparent;
            border-bottom: 10px solid rgba(0, 0, 0, 0.4);
            transform: rotateZ(-47deg);
            left: -8.7px;
            top: -8.5px;
          }
          > section:nth-child(2) {
            width: 15px;
            height: 15px;
            border: 1px solid #000000;
            transform: rotateZ(45deg);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 2vw;
            > span {
              width: 8px;
              height: 8px;
              background-color: #000000;
            }
          }
          > section:nth-child(3) {
            width: 8vw;
            transform: translateX(-40px);
            > span:nth-of-type(1) {
              margin-left: 2vw;
            }
            > span {
              font-size: 1.5rem;
              color: #27353d;
            }
          }
          > section:nth-child(4) {
            width: 3.5vw;
            height: 7vh;
            border: 3px solid #9f7b4b;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.4);
            cursor: pointer;
            z-index: 1;
            fill-opacity: (0.6);
          }
          > section:nth-child(4):hover {
            fill-opacity: (1);
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
        // 开关
        .el-switch {
          height: 4.3vh;
          margin-left: 3vw;
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #9f7b4b;
          width: 5vw;
          border-radius: 5vw;
          margin-top: 1.3vh;
          background-color: rgba(0, 0, 0, 0.4);
          position: relative;
          cursor: pointer;
          .off {
            position: absolute;
            z-index: 1;
            width: 23px;
            height: 23px;
            border-radius: 50%;
            background-color: #9f7b4b;
          }
          .el-switch__core {
            width: 5.5vw;
            height: 4.7vh;
            border-radius: 2vw;
          }
        }
      }
      // 人物信息 栏
      .words {
        width: 28vw;
        height: 17vh;
        margin-top: 2vh;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        > section:nth-child(1) {
          width: 5vw;
          display: flex;
          justify-content: center;
          > span {
            width: 10px;
            height: 10px;
            border: 1px solid #fff;
            margin-top: 2vh;
            transform: rotate(45deg);
            display: flex;
            justify-content: center;
            align-items: center;
            > span {
              width: 5px;
              height: 5px;
              background-color: #fff;
            }
          }
          cursor: pointer;
          .off {
            position: absolute;
            z-index: 1;
            width: 23px;
            height: 23px;
            border-radius: 50%;
            background-color: #9f7b4b;
          }
          .el-switch__core {
            width: 5.5vw;
            height: 4.7vh;
            border-radius: 2vw;
          }
        }
      }
      // 人物信息 栏
      .words {
        width: 28vw;
        height: 17vh;
        margin-top: 2vh;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        > section:nth-child(1) {
          width: 5vw;
          display: flex;
          justify-content: center;
          > span {
            width: 10px;
            height: 10px;
            border: 1px solid #fff;
            margin-top: 2vh;
            transform: rotate(45deg);
            display: flex;
            justify-content: center;
            align-items: center;
            > span {
              width: 5px;
              height: 5px;
              background-color: #fff;
            }
          }
        }
      }
      > section:nth-child(2) {
        font-size: 0.9rem;
      }
      > section:nth-child(2) {
        font-size: 0.9rem;
      }
    }
  }
}
//轮播
.role_footer {
  width: 100%;
  height: 32vh;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
