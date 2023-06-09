<template>
  <teleport to="body">
    <div
      class="dialog"
      v-show="controlsObj.isDialog[controlDialog]"
      @click="cancel"
    ></div>
  </teleport>
</template>

<script>
import controlsObj from '@/hooks/personalCenter/controls'
import { inject } from 'vue';
export default {
  setup() {

    // 接收controlDialog参数，控制遮罩层的开启与关闭
    let controlDialog = inject('controlDialog')

    // 点击父遮罩层取消遮罩层
    function cancel(){
         Reflect.set(controlsObj.isDialog,controlDialog,false)
    }
    return {
        controlsObj,//按钮集合
        cancel,//遮罩层取消
        controlDialog//总的遮罩层的判断开关
    };
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
