<template>
  <teleport to="body">
    <div
      class="dialogs"
      v-show="controlObj.isDialog[controlDialog]"
      @click="cancel"
    >
    <!-- 显示页面内的组件的插槽 -->
     <slot></slot> 
  </div>
  </teleport>
</template>

<script>
import controlObj from '@/hooks/personalCenter/control'
import { inject } from 'vue';
export default {
  name:"dialogPage",
  setup() {

    // 接收controlDialog参数，控制遮罩层的开启与关闭
    let controlDialog = inject('controlDialog')
    console.log(controlDialog);
    // 点击父遮罩层取消遮罩层
    function cancel(){
         Reflect.set(controlObj.isDialog,controlDialog,false)
    }


    return {
        controlObj,//按钮集合
        cancel,//遮罩层取消
        controlDialog//总的遮罩层的判断开关
    };
  },
};




</script>

<style lang="scss" scoped>
.dialogs {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
