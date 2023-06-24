<template>
    <section class="msg" :style='{
        backgroundColor:status == 1? "#FE1610" : "#0CB751"
    }'>
        {{ status == 1? msg : message }}
    </section>
</template>
<script>
import {reactive} from "vue"

export default {
    name: "messagePage",
    setup() {
        let {msg}  = reactive(JSON.parse(sessionStorage.getItem("msg")))

        return {
            ...msg,
        }
    }
}
</script>

<style lang="scss" scoped>
.msg {
    width: 14vw;
    height: 9vh;
    background-color: #0CB751;
    border-radius: 1vw;
    position: absolute;
    left: 43vw;
    top: 12vh;
    color: #fff;
    text-align: center;
    line-height: 9vh;
}

</style>