<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 17:37:47
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 15:12:10
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\ThreeCustomFirstAction.vue
 * @Description: my first custom action
-->
<template>
  <div id="map-content">
    <div id="customMap" ref="customMap"></div>
    <div id="tooltip" ref="tooltip"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init } from './index'
import { renderer } from '@/base/baseObj'
import { stats } from '@/base/datGUI'

const customMap = ref()
const tooltip = ref()

onMounted(() => {
  customMap.value.appendChild(renderer.domElement)
  customMap.value.appendChild(stats.dom)
  init(tooltip.value)
})
</script>

<style scoped lang="less">
#map-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  #customMap {
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
