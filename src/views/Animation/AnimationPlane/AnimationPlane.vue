<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-19 09:13:40
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 11:46:43
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPlane\AnimationPlane.vue
 * @Description: plane animation
-->

<template>
    <div id="map-content">
      <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
    </div>
  </template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { renderer } from '@/base/baseObj'
import { initRender } from './index'

const myMap = ref()

onMounted(() => {
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
