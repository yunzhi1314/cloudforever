<template>
    <div :style="{backgroundImage:`url(${data.dataList.datas.newsRight})`}">
        <section>
            <img src="" alt="">
        </section>
        <section>
            <ul>
                <li>位于提瓦特大陆东方的富饶港湾。</li>
                <li>傲然矗立的山麓与石林、广袤的平原与生机勃勃的河滩共同构成了璃月的丰富地貌，在四季分明的</li>
                <li>气候下焕发出多彩的风华。山石奇景间，又埋藏了多少岩之魔神的古老馈赠等待着人们发掘呢？。</li>
               
            </ul>
          
        </section>
        <div>
        <section><img src="" alt=""></section>
         <section>查看详情</section>
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

</style>