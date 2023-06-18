<template>
    <Teleport to="body">
        <div class="dialog" v-show="controlObj.isDialog[name]" @click="cancel">
            <slot></slot>

        </div>

    </Teleport>
</template>

<script>
import controlObj from "@/hooks/control"
import { inject } from "vue"
export default {
    name: "dialogPage",
    setup() {
        // 获取对应遮罩层状态
        let name = inject("name")

        // 取消遮罩层事件
        function cancel() {
            Reflect.set(controlObj.isDialog, name, false)

        }

        return {
            controlObj,
            cancel,
            name,
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
}
</style>