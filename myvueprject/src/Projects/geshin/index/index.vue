<template>
  <div class="box">
      <!-- 中间头部 -->
      <div>
        <!--  -->
        <div>
          <img :src="dataList.data.dataList.qishengImg" alt="">
        </div>
 
        <!--  -->
        <div>
          <img :src="dataList.data.dataList.videoBtn" alt="">
          <div class="zt" @click="controlObj.isShow = true">
            <!-- 三角按钮 -->
            <div class="sj"></div>
          </div>
        </div>
         
        <!--  -->
        <div>
          <!--  -->
          <div>
            <img :src="dataList.data.dataList.tip" alt="">
          </div>

          <div>
            <section>
              <img :src="dataList.data.dataList.download.erweima" alt="">
              <img :src="dataList.data.dataList.download.erweima_LOGO" alt="">
            </section>

            <div>
              <section>
                <img :src="dataList.data.dataList.download.PS4" alt="">
                <img :src="dataList.data.dataList.download.TAPTAP" alt="">
              </section>

              <section>
                <img :src="dataList.data.dataList.download.Iphone" alt="">
                <img :src="dataList.data.dataList.download.ANDROID" alt="">
              </section>
            </div>

            <section>
              <img :src="dataList.data.dataList.download.PC" alt="">
            </section>
          </div>

          <!--  -->
          <section></section>
        </div>
        
        <!--  -->
        <div>

        </div>
      </div>

      <!-- 中间中部 -->
      <div :style="{backgroundImage:`url(${dataK.dataList.background})`}">
         
      </div>

      <!-- 中间底部 -->
      <div></div>
  </div>
  <!-- <video src="" autoplay muted style="width: 98.7vw;"></video> -->
  <video class="vd" id="vd" autoplay muted :src="dataList.data.dataList.background.bgVideo" ></video>

  <div class="delog" v-show="controlObj.isShow == true" @click="controlObj.isShow = false">
    <video @click.stop controls :src="dataList.data.dataList.video" id="vd2"></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import req from "@/utils/request"; // 导入你的网络请求实例
import { useStore } from "vuex";
import controlObj from "@/utils/controls";

let store = useStore();

// const videoSrc = ref("");

// onMounted(async () => {
//     const response = await req.get("/api/geshin/index/page1");
//     videoSrc.value = response.data.dataList.background.bgVideo;
//     // 获取视频元素并播放
//     const videoElement = document.querySelector("video") as HTMLVideoElement;
//     if (videoElement) {
//       videoElement.play();
//     }
// });

req.get("/api/geshin/index/page1").then(res =>{
  store.commit("childrenStor/Bgvdeo",{name:"Bgkound", data:res.data})
})
let { ...dataList } = useStore().state.childrenStor.Bgkound;
console.log(dataList.data.dataList.background.bgVideo);

req.get("/api/geshin/index/page2").then(res=>{
store.commit("childrenStor/getcopydata",{name:"copydata",data:res.data})
})
let dataK = useStore().state.childrenStor.copydata;
console.log(dataK);

onMounted(() =>{
  let vd = document.querySelector("#vd") as HTMLVideoElement;
  // let vd2 = document.querySelector("#vd2") as HTMLVideoElement;
  // console.log(vd2);
  if(vd){
    vd.play();
  }
  
})
// let vd2 = document.querySelector("#vd2") as HTMLVideoElement;
// console.log(vd2);
// if(controlObj.isShow == true){
//     vd2.play();
//     console.log(vd2);
//   }else{
//     vd2.pause();
//   }

</script>

<style scoped lang="scss">
/* 隐藏视频控制条 */
.vd::-webkit-media-controls {
  display: none;
}
.vd::-webkit-media-controls-enclosure {
  display: none !important;
}
.vd::-webkit-media-controls-overlay-play-button {
  display: none !important;
}
.vd{
   width: 98.7vw;
   position: absolute;
   top: 0;
   z-index: -1;
}

.box{
  width: 98.7vw;
  height: 300vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1.3fr 1fr 1fr;
  
  // 中间头部
  > div:nth-child(1){
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 2fr 1.3fr 1fr;
    
    // 中间头部上部分
    > div:nth-child(1){
      display: flex;
      justify-content: flex-end;
      align-items: center;

      > img{
        margin-top: 7vh;
      }
    }
    
    // 中间头部中部分
    > div:nth-child(2){
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: relative;

      > img{
        margin-top: 6vh;
      }

      > div:nth-child(2){
        width: 3.8vw;
        height: 7.8vh;
        border-radius: 50%;
        position: absolute;
        left: 47.47vw;
        top: 27.5vh;
        background-color: #fff;
        cursor: pointer;

        > div:nth-child(1){
           width: 0;
           height: 0;
           border-style: solid;
           border-width: 13px 0 13px 19px;
           border-color: transparent transparent transparent #4B6572;
           border-radius: 2px;
           left: 48.9vw;
           cursor: pointer;
           margin-left: 1.5vw;
           margin-top: 1.7vh;
        }

        > div:nth-child(1):hover{
          border-color: transparent transparent transparent #fff;
        }
      }
      
      > div:nth-child(2):hover{
        background-color: rgba(255,255,255,0);
      }
      
      // > div:nth-child(3):hover{
      //   border-color: transparent transparent transparent #fff;
      // }
    }

    // 头部中部第二部分
    > div:nth-child(3){
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr;
      
      > div:nth-child(1){
        position: relative;
        > img{
          width: 9vw;
          position: absolute;
          left: 3vw;
          top: 5vh;
        }
      }

      > div:nth-child(2){
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr;

        > section:nth-child(1){
          position: relative;
          > img:nth-child(1){
            width: 9vw;
            height: 20.5vh;
            margin-top: 3vh;
            margin-left: 2.5vw;
          }

          > img:nth-child(2){
            width: 2vw;
            position: absolute;
            top: 11vh;
            left: 6.1vw;
          }
        }

        > div:nth-child(2){
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;

          > section{
            display: flex;
            align-items: flex-end;
            > img{
              width: 12vw;
              height: 10vh;
            }
          }
        }

        > section:nth-child(3){
          display: flex;
          align-items: flex-end;
          > img{
            width: 10vw;
            height: 22.4vh;
          }
        }
      }
      
      // > div:nth-child(2){
      //   > section:nth-child(1){
      //     position: relative;
      //     > img{
      //       width: 9vw;
      //       position: absolute;
      //       left: 3vw;
      //       top: 68vh;
      //     } 
      //   } 
      // }
    }
  }

  > div:nth-child(2){
    margin-top: -1vh;
  }
}

.delog{
  width: 98.7vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  > video{
    width: 65vw;
    height: 78vh;
  }
}
// .zt:hover{
//   background-color: rgba(255,255,255,0.7);
// }

</style>




