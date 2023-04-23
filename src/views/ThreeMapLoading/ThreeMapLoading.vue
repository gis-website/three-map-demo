<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 07:36:02
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 08:07:49
 * @FilePath: \three-map-demo\src\views\ThreeMapLoading\ThreeMapLoading.vue
 * @Description: three.js loading map by geojson
-->
<template>
    <div id="myMap" ref="myMap"></div>
  </template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init } from './index'
import { renderer } from './composables/baseObj'

const myMap = ref()

onMounted(async () => {
  myMap.value.appendChild(renderer.domElement)
  init()
})

</script>

  <style scoped lang="less">
  #myMap {
    width: 100%;
    height: 100%;
  }
  </style>
