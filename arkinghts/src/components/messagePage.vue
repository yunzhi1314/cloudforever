<template>
    <div class="tosi">
       <slot></slot>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {


        }
    }
}
</script>

<style lang="scss" scoped>
 .tosi{
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