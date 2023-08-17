<template>
  <div>
    <div class="bImg" 
    
    >

    </div>
  </div>
</template>

<script setup lang="ts">
import { Numlist } from "@/utils/require"

let data = new Numlist;
data.getDataObj("/api/geshin/index/page2","get",{})


</script>
    
<style scoped>
    
</style>
