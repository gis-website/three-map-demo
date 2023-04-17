<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 11:11:34
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-15 14:03:34
 * @FilePath: \three-map-demo\src\views\ThreeMapAnimationSecond\ThreeMapAnimationSecond.vue
 * @Description: three.js add seconde animation
-->
<template>
    <div id="map-content">
      <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
    </div>
  </template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { renderer } from './composables/baseObj'
import { initRender } from './index'

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
