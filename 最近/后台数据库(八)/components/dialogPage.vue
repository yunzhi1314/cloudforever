<template>
    <Teleport to='body' >
        <div class="dialog" v-show="controlObj.isDialog[controlDialog]" @click="cancel">
        <slot></slot>
        </div>
    </Teleport>
</template>

<script>
import {inject} from "vue"
import controlObj from "@/hooks/controls"
export default {
    name:"dialogPage",
    setup() {
        let controlDialog = inject("controlDialog")

        function cancel(){
            Reflect.set(controlObj.isDialog,controlDialog,false)
        }

        return {
            controlObj,
            controlDialog,
            cancel
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog{
        width: 100vw;
        height:100vh;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }
</style>