<template>
    <div class="dialog">
        <div></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.dialog {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba($color: #000000, $alpha: 0.5);

    div {
        width: 30vw;
        height: 30vh;
        background-color: #fff;
    }
}
</style>