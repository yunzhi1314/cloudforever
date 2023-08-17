<template>
    <div 
    class="imgss"
    :style="{backgroundImage:`url(${data.dataList.datas.background})`}">
      
        <section class="tou">
        <img src="" alt="">
        </section>
        <section class="zhong">
            <ul>
                <li>这里是七种元素交汇的幻想世界「提瓦特」</li>
                <li>在遥远的过去，人们藉由对神灵的信仰，获赐了驱动元素的力量，得以在荒野中筑起家园。</li>
                <li>五百年前，古国的覆灭却使得天地变异…</li>
                <li>如今，席卷大陆的灾难已经停息，和平却仍未如期光临。</li>
            </ul>
            
        </section>
        <div class="dibu">
                <section><img src="" alt=""></section>
                <section @click="kk">前往游记精选</section>
                
            </div>
            <router-view></router-view>

  
    </div>
</template>

<script setup>
import { Public} from "@/utils/require"
import { useRouter } from 'vue-router';

let data = new Public()
data.getDataObj('/api/geshin/index/page2','get')
console.log(data)



const router =useRouter();

 function kk(){
    router.push({
        name:"Liiiii"
    })
 } 
</script>

<style lang="scss" scoped>
.imgss{
    width: 100vw;
    height: 600vh;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-size: 100vh auto;


    .tou{
        flex: 2;
    }
    .zhong{
        flex: 2;
    }
    .dibu{
        flex: 1;
    }
}
</style>