<template>
    <Teleport to="body">
        <div class="masked" v-show="controlObj.isDialog" @click="ceale">
            <slot></slot>
        </div>
    </Teleport>
</template>

<script>
import { inject } from 'vue';
export default {
    name: "dialogPage",
    setup() {
        //接收外部传入的按钮
        let controlObj = inject("controlObj")
        //点击页面取消遮罩层
        function ceale() {
            controlObj.isDialog = false
        }

        return {
            ceale,
            controlObj,
        }
    }
}
</script>

<style lang="scss" scoped>
.masked {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 0;
    left: 0;
    z-index: 9;
}
</style>