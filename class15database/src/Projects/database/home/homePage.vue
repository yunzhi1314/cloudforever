<template>
    <div>
        <h1>homePage</h1>
        <button @click="loginFun">登录</button>
    </div>
</template>

<script setup lang="ts">
    import req from "@/utils/request"

    let data={
        telephone:"18665307891",
        password:"yz123456"
    }
    function loginFun(){
        req.post("http://8.134.179.237:8085/api/geshin/user/login", data).then((res:any)=> {
            console.log(res)
        if(res.data.token){
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("userid",res.data.userId)
        } })
    }

</script>

<style scoped lang="scss">
button{
    width: 200px;
    height: 40px;
    border-radius: 10px;
}
</style>
