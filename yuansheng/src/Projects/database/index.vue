<template>
    <div>
        <ul>
            <router-link to="/user">1</router-link>
            <router-link to="/role">2</router-link>
            <router-link to="/department">3</router-link>
            <router-link to="/menu">4</router-link>
            <router-link to="/menu">dictionary</router-link>
        </ul>
        <div><router-view></router-view></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

</script>

<style scoped></style>