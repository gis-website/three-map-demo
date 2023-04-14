<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 08:02:25
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 17:07:00
 * @FilePath: \three-map-demo\src\views\ThreeMapActionSecond\ThreeMapActionSecond.vue
 * @Description: three.js add animation
-->
<template>
    <div id="map-content">
      <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
    </div>
  </template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init } from './index'

const myMap = ref()
const tooltip = ref()

onMounted(async () => {
  init(myMap.value, tooltip.value)
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
