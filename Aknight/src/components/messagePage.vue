<template>
    <div>
        <section class="tusi" :style='{
            backgroundColor: status == 1 ? "#FE1610" : "#0CB751"
        }'>
            {{ status == 1 ? msg : message }}
        </section>

    </div>
</template>

<script>
import controlObj from '@/hooks/personalCenter/controlObj'
import { reactive } from 'vue'
export default {
    name: "messagePage",
    setup() {
        let {msg} = reactive(JSON.parse(sessionStorage.getItem("msg")))
        return {
            controlObj,
            ...msg
        }
    }
}
</script>

<style lang="scss" scoped>
.tusi {
    width: 200px;
    border-radius: 1vw;
    position: absolute;
    left: 43vw;
    top: 12vh;
    color: #fff;
    text-align: center;
    padding: 0.5vw;

}
</style>
