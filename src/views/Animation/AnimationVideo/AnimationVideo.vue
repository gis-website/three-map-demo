<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-16 13:39:02
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 15:01:19
 * @FilePath: \three-map-demo\src\views\Animation\AnimationVideo\AnimationVideo.vue
 * @Description: video animation
-->

<template>
  <div id="map-content">
    <div id="myMap" ref="myMap"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { initRender } from './index'
import { renderer } from '@/base/baseObj'

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
}
</style>
