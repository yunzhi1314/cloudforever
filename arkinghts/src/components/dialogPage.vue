<template>
    <teleport to='body'>
        <div class="dialog" v-show="controlObj.isDialog[controlDialog]" @click="cancel">   
        </div>
    </teleport>
</template>

<script>

export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
   .dialog{
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
   } 
  

</style>