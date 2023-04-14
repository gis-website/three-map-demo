<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 08:24:01
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 09:53:32
 * @FilePath: \three-map-demo\src\views\ThreeMapAnimationFirst\ThreeMapAnimationFirst.vue
 * @Description: three.js add animation one
-->

<template>
  <div id="map-content">
    <div id="myMap" ref="myMap"></div>
    <div id="tooltip" ref="tooltip"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { animate, setGeometry } from './index'
import { renderer } from './composables/baseObj'
import { getJsonPuKouData } from '@/api/index'
import { mouseClick } from './composables/outline'

const myMap = ref()

onMounted(async () => {
  // const myMapData = await getJsonNanJingData()
  // const chinaData = await getJsonChinaData()
  const pukouData = await getJsonPuKouData()
  setGeometry(pukouData)
  myMap.value.appendChild(renderer.domElement)
  // 添加监听
  window.addEventListener('click', (e) => {
    mouseClick(e)
  })
  animate()
})
</script>

<style scoped lang="less">
#map-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  #myMap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #tooltip {
    display: none;
    position: absolute;
    z-index: 2;
    background: white;
    padding: 10px;
    border-radius: 2px;
    overflow: hidden;
  }
}
</style>
