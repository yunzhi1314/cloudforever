<template>
    <div>
    </div>
</template>

<script>
import { centerMenu } from '@/api/arknight/centerPage/routes';
import { onBeforeRouteLeave, useRouter } from 'vue-router'
export default {
    name: "bufferPage",
    setup() {
        const router = useRouter()
        centerMenu()
        onBeforeRouteLeave(() => {
            setTimeout(()=>{
                router.go(0)
            },50)
        })
        return {}
    }
}
</script>

<style lang="scss" scoped></style>