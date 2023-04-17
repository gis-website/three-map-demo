<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 08:54:22
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-17 09:05:29
 * @FilePath: \three-map-demo\src\views\Animation\AnimationHalo\AnimationHalo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div id="map-content">
      <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
    </div>
  </template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { initRender } from './index'
import { renderer } from './composables/baseObj'

const myMap = ref()

onMounted(async () => {
  myMap.value.appendChild(renderer.domElement)
  initRender()
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
