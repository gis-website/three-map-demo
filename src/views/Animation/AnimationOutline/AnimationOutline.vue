<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 09:55:02
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 11:28:14
 * @FilePath: \three-map-demo\src\views\Animation\AnimationOutline\AnimationOutline.vue
 * @Description: outline animation
-->

<template>
  <div id="map-content">
    <div id="myMap" ref="myMap"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { initRender, setGeometry } from './index'
import { renderer } from '@/base/baseObj'
import { getJsonPuKouData } from '@/api/index'

const myMap = ref()

onMounted(async () => {
  const pukouData = await getJsonPuKouData()
  setGeometry(pukouData)
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
