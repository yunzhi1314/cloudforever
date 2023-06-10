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
        let msg = JSON.parse(sessionStorage.getItem("msg")).msg
        let message = reactive({
            status: "",
            msg: "",
            message: ""
        })
        if (msg != null && msg != 0) {
            message.status = msg.status
            message.msg = msg.msg
            message.message = msg.message
        }
        console.log(message);
        return {
            controlObj,
            ...message
        }
    }
}
</script>

<style lang="scss" scoped>
.tusi {
    width: 200px;
    height: 50px;
    border-radius: 1vw;
    position: absolute;
    left: 43vw;
    top: 12vh;
    color: #fff;
    text-align: center;
    line-height: 50px;

}
</style>
