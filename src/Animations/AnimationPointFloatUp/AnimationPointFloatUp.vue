<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-20 15:08:00
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 13:39:28
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPointFloatUp\AnimationPointFloatUp.vue
 * @Description: point float up animation
-->

<template>
  <div id="map-content">
    <div id="customMap" ref="customMap"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init } from './index'
import { renderer } from '@/base/baseObj'

const customMap = ref()

onMounted(() => {
  customMap.value.appendChild(renderer.domElement)
  init()
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

}
</style>
