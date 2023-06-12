<template>
    <div>

    </div>
</template>

<script>
// import {useRoute} from "vue-router"
import {toRefs} from "vue"
export default {
    name:"reChargePage",
    setup () {
        // let route = useRoute()
        return {
            ...toRefs(JSON.parse(sessionStorage.getItem("selfQuery")).selfQuery)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>