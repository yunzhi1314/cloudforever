
    <template>
      <div class="news-bg-box">
         <div class="box-one">
       <ul class="ul">
        <li></li>
        <li></li>
        <li></li>
       </ul>
         </div>
         <!-- 分割线 以下内容为中间部分 -->
         <div class="main-box" >
         <section class="main-sectionbox">
         <li v-for="(item,index) in textcontent" :key="index">{{ item.licontent }}</li>
        </section>
        <!-- 分割线 -->
        <main>
  
        </main>
        <button>加载更多</button>
        </div>
      
      </div>
    </template>

    <script setup lang="ts">
import { reactive } from "vue";

    
    const textcontent = reactive([
      {
        licontent:"最新"
      },
      {
        licontent:"新闻"
      },
      {
        licontent:"公告"
      },
      {
        licontent:"活动"
      }
    ])


    </script>
    
    <style lang="scss" scoped>
    .news-bg-box{
      background-color: #fff;
      height: 100vh;
      width: 100vw;
     
      .box-one{
        height:65.7vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ul{
        display: flex;
        align-items: center;
        justify-content: center;
        * {
     width:21.9vw;
     background-color:rgb(0, 0, 0,0.5);
     height: 46.5vh;
     margin: 0vh 0.5vw;
     padding: 0.5vw;
      }
      }
      .main-box{
        display: flex;
        flex-direction: column;
        align-items: center;
      .main-sectionbox{
        display: flex;
        margin-right: 31vw;
        *{
          width: 8.17vw;
          display: flex;
        justify-content: center;
        align-items: center;
        background-color: #CFD0D1;
        height: 3.61vh;
        border-radius: 0.3vw;
        margin: 4.0vh 0.5vw;
        &:hover{
          background-color: #000;
          color: #CAB38D;
          cursor: pointer;
        }
        }
      }
      main{
        width: 66.77vw;
        background-color: gray;
        height: 17.66vh;
      }
      button{
        height: 3.71vh;
        width: 66.77vw;
        background-color: #5C5E62;
        color: #fff;
        border: none;
        margin-top: 4.02vh;

      }
    }
    }
    
    </style>
