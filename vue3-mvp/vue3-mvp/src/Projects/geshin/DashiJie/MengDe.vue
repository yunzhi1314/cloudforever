<template>
    <div class="lll" 
    v-for="(item,index) in data.dataList.datas.cityBack" :key="index"
    :style="{backgroundImage:`url(${item.cityImg})`}"
    >
        <div id="bibi">
        <section id="tou">
            <img src="" alt="">
        </section>
        <section id="zhong">
            <ul>
                <li>位于提瓦特大陆东北部的自由城邦</li>
                <li>群山和广袤的平原间，自由之风携着蒲公英的气息吹拂过果酒湖，为坐落于湖心岛上的蒙德城送去。</li>
                <li>风神巴巴托斯的祝福与恩泽。</li>
               
            </ul>
          
        </section>
        <div id="dibu">
         <section><img src="" alt=""></section>
        <section>查看详情</section>
        </div>
  </div>
  <div id="aaa">
        <section id="aas">
            <img src="" alt="">
        </section >
        <section id="aad">
            <ul>
                <li>位于提瓦特大陆东方的富饶港湾。</li>
                <li>傲然矗立的山麓与石林、广袤的平原与生机勃勃的河滩共同构成了璃月的丰富地貌，在四季分明的</li>
                <li>气候下焕发出多彩的风华。山石奇景间，又埋藏了多少岩之魔神的古老馈赠等待着人们发掘呢？。</li>
               
            </ul>
          
        </section>
        <div id="aaf">
        <section><img src="" alt=""></section>
         <section>查看详情</section>
         </div>
    </div>

    <div class="bbb">
        <section class="bbs">
            <img src="" alt="">
        </section>
        <section class="bbd">
            <ul>
                <li>位于提瓦特大陆远东的封闭群岛。。</li>
                <li>越过无尽的雷暴，踏上红枫与绯樱眷顾的诸岛，在环绕的砂堤、高耸的断崖与幽秘的山林之中，见</li>
                <li>证御建鸣神主尊大御所大人所追寻的永恒。</li>
               
            </ul>
          
        </section>
        <div class="bbf">
        <section><img src="" alt=""></section>
         <section>查看详情</section>
         </div>
    </div>
 
    <div class="ccc">
        <section class="ccs">
            <img src="" alt="">
        </section>
        <section class="ccd">
            <ul>
                <li>位于提瓦特大陆中西部的学城之都。</li>
                <li>同时拥有葱郁雨林与荒芜沙土的奇异国度，无数智慧的果实在这里生长、埋葬。无论是穿越丛林踏</li>
                <li>上学城的台阶，还是深入沙漠挖掘赤土的遗迹，远道而来的旅者都可以在此获取宝贵的智识。</li>
               
            </ul>
          
        </section>
        <div class="ccf">
        <section><img src="" alt=""></section>
         <section>查看详情</section>
         </div>
    </div>

    </div>
    
</template>


<script setup>
import { Public} from "@/utils/require"
let data = new Public()
data.getDataObj('/api/geshin/index/page2','get')
console.log(data)

</script>

<style lang="scss" scoped>
.lll{
    background-repeat:no-repeat;
     background-size: cover;
     width: 100vw;
    height: 100vh;
    color: white;

}
#bibi{
width: 100vw;
height: 100vh;
 display: flex;
    align-items: center;
    flex-direction: column;
    color: white;
   
    #tou{
        flex: 2;
    }
    #zhong{
        flex: 2;
    }
    #dibu{
        flex: 1;
    }
}


#aaa{
    width: 100vw;
height: 100vh; 
display: flex;
    align-items: center;
    flex-direction: column;

    #aas{
        flex: 2;
    }
    #aad{
        flex: 2;
    }
    #aaf{
        flex: 1;
    }
}

.bbb{
    width: 100vw;
height: 100vh; 
display: flex;
    align-items: center;
    flex-direction: column;

    .bbs{
        flex: 2;
    }
    .bbd{
        flex: 2;
    }
    .bbf{
        flex: 1;
    }
}

.ccc{
 
    width: 100vw;
height: 100vh; 
display: flex;
    align-items: center;
    flex-direction: column;

    .ccs{
        flex: 2;
    }
    .ccd{
        flex: 2;
    }
    .ccf{
        flex: 1;
    }
}
</style>