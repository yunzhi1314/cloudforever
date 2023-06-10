<template>
    <div>
        <section class="tusi" :style='{
            backgroundColor: status == 1 ? "FE1610" : "#0CB751"
        }'>

        </section>

    </div>
</template>

<script>
import controlObj from '@/hooks/personalCenter/controlObj'
export default {
    name: "messagePage",
    setup() {

        return {
            controlObj,
        }
    }
}
</script>

<style lang="scss" scoped>
.tusi {
    width: 200px;
    height: 50px;
    background-color: green;
    border-radius: 1vw;
    position: absolute;
    left: 43vw;
    top: 12vh;
    color: #fff;
    text-align: center;
    line-height: 50px;

}
</style>