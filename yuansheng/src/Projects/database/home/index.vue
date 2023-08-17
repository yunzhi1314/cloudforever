<template>
  <div>
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { ref } from 'vue'
const chart = ref(null)

function initChart() {
  if (chart.value) {
    echarts.init(chart.value)
  }
}

onMounted(() => {
  let div = echarts.init(document.querySelector('#chart') as HTMLDivElement)
  div.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  })
})
</script>

<style scoped lang="scss">
</style>