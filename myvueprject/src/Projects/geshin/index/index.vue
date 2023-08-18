<template>
  <div>
    <div></div>
    <div></div>
    <video :src="videoSrc" autoplay muted style="width: 98.7vw;"></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import req from "@/utils/request"; // 导入你的网络请求实例

const videoSrc = ref("");

onMounted(async () => {
    const response = await req.get("/api/geshin/index/page1");
    videoSrc.value = response.data.dataList.background.bgVideo;
    // 获取视频元素并播放
    const videoElement = document.querySelector("video") as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
    }
});


</script>

<style scoped>
/* 隐藏视频控制条 */
video::-webkit-media-controls {
  display: none;
}
video::-webkit-media-controls-enclosure {
  display: none !important;
}
video::-webkit-media-controls-overlay-play-button {
  display: none !important;
}
</style>




