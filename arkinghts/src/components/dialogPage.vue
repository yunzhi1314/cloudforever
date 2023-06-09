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
   } 
  

</style>