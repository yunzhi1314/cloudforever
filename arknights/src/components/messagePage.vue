<template>
    <teleport to="body">
        <div class="tosi" :style="{ backgroundColor: status == 1 ? '#ff0000' : '#0CB751' }">
            {{ status == 1 ? msg : message }}
        </div>
    </teleport>
</template>

<script>
import { reactive } from 'vue';

export default {
    name:"messagePage",
    setup() {
        let { msg } = reactive(JSON.parse(sessionStorage.getItem("msg")))

        return {
            ...msg
        }
    }
}
</script>

<style lang="scss" scoped>
.tosi {
    width: 13vw;
    height: 10vh;
    background-color: #19d781;
    border-radius: 1vw;
    position: absolute;
    top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>