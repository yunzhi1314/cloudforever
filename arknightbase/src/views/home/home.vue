<script setup lang="ts">
  import {useRoute} from "vue-router"
  import type{Ref} from "vue"
import {ref} from "vue"

const route = useRoute()
let top:Ref<number> = ref(0)
top.value = route.meta.top as any
console.log(top.value)
</script>

<template>
  <div id="home"  :style='{
                transform:`translateY(-${route.meta.top}vh)`
            }'>
    <h1 style="color: #fff">home</h1>
  </div>
</template>

<style scoped></style>
