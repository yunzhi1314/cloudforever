<template>
    <Teleport to="#app">
        <dialog @click="controlObj.isCode=false" :style="{display:controlObj.isCode?'flex':'none'}">
            <div class="code-box" @click.stop>
                <h1>验证码</h1>
                <div class="code-kuang">
                    <span class="span" v-html="data.dataList.datas"></span>
                </div>
                <section class="input-kuang">
                    <input type="text" v-model="chaptcha">
                </section>
                <section class="btn">
                    <button @click="handleSureCode">确认</button>
                    <button @click="controlObj.isCode=false">取消</button>
                </section>
                
            </div>
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
import controlObj from '@/utils/controls'
import {Public,DOMDataObj,getPostData} from '@/utils/getRequest'
import {ref} from 'vue'
import req from '@/utils/request'

let data = new Public()
data.getDataObj('/api/geshin/user/getCode', 'get', {})

let chaptcha = ref('')
let telephone = defineProps(['tel'])

function handleSureCode(){
    req.post('/api/geshin/user/telCode', 
    {telephone:telephone.tel.telephone,mathCode:chaptcha.value}).then((res: any) => {
         alert(res.data.message)
        })
}


</script>

<style scoped lang="scss">
dialog{
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1000;
    .code-box{
        width: 350px;
        height: 400px;
        border-radius: 5px;
        background-color: white;
        h1{
            text-align: center;
            padding: 10px;
        }
        .code-kuang{
            text-align: center;
        }
        .input-kuang{
            text-align: center;
        }
        .btn{
            text-align: center;
        }
    }
}
</style>