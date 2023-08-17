    <template>
        <div class="bg-div">
         <header></header>
         <!-- 分割线 -->
        <main>
        <div style="display: flex;background-color: aquamarine;justify-content: center;">
        <!-- 分割线 中间左边部分 -->
       <div class="li-div"> 
       <li>{{ "<" }}</li>
       <li>{{ ">" }}</li>
       </div>
       <!-- 分割线  上边右半部分-->
       <div class="aside"> 
        <li v-for="(item,index) in textcontent" :key="index"></li>
        <section></section>
       </div>
      </div>
      <ul class="ul-li">
        <li v-for="(item,index) in textcontent" :key="index">  settime </li>
      </ul>
    <!-- 下半个部分 -->
       <div class="main-footer">
        <div class="main-box"  ></div>
         <div class="main-footer-right"> jump</div>
       </div>
        </main>
        </div>
    </template>

    <script setup lang="ts">
import { reactive } from "vue";


    const textcontent =reactive(["","","" ])

</script>
    
    <style lang="scss" scoped>

    .bg-div{
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-rows: 0.7fr 9fr;
      grid-template-columns:1fr ;
      grid-template-areas: "header" "main";
      header{
        grid-area: header;
        background-color: #1F2233;
      }
      main{
        grid-area: main;
        padding: 4.85vh;
        .li-div{
          background-color: gray;
          width: 36.9vw;
          height: 24.07vh;
          margin-right: 1vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:hover{
            cursor: pointer;
          }
        *{
          height: 4.85vh;
          width: 2.4vw;
          border-radius: 50%;
          background-color: rgb(0, 0, 0,0.5);
          color: #fff;
          font-size: 1.5vw;
          display: flex;
           justify-content: center;
           align-items: center;
           padding-bottom: 0.5vh;
           margin: 0vh 2vw;
          
          &:hover{
            background-color: #00C3FF;
          }
        }
        }
        .aside{
          width: 14.79vw;
          background-color: green;
          height:  24.17vh;
          border-radius: 0.5vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content:space-around;
       *{
        width:  8.12vw;
        background-color: #FFE14C;
        height: 3.92vh;
        border-radius: 0.3vw;
        cursor: pointer;
        &:last-child{
          background-color: aqua;
          width: 100%;
        }
       }
        }
        .main-footer{
          width: 100%;
          background-color: red;
          display: flex;
          justify-content: center;
        .main-box{
          width: 36.9vw;
        height: 30.88vh;
        background-color: #00C3FF;
        margin-right: 1.2vw;
      }
      .main-footer-right{
        background-color: black;
        width: 14.53vw;
        height: 17.35vh;
      }

        }
        .ul-li{
          display: flex;
         width: 100%;
         justify-content: center;
         padding-right: 10%;
         margin: 2vh 0vw;
          *{
            background-color: #DFE1E6;
            margin: 0vh 2vw;
            width: 1vw;
            height: 0.2vh;
            border-radius: 5vw;
          }
        }
      }
   
    }

    </style>
