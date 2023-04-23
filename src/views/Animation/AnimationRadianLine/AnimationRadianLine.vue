<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 15:20:49
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 14:54:07
 * @FilePath: \three-map-demo\src\views\Animation\AnimationRadianLine\AnimationRadianLine.vue
 * @Description: radian line animation
-->

<template>
  <div id="map-content">
    <div id="myMap" ref="myMap"></div>
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
}
</style>
