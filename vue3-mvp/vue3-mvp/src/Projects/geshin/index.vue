<template>
    <div>
<span>mmm</span>
<button @click="mm()">世界</button>
<router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router =useRouter();

 function mm(){
    router.push({
        name:"MengDe"
    })
 }  
</script>

<style scoped>

</style>