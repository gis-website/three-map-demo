<template>
    <div id="map-content">
      <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
    </div>
  </template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { animate } from './index'
import { renderer } from '@/base/baseObj'

const myMap = ref()

onMounted(() => {
  myMap.value.appendChild(renderer.domElement)
  animate()
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
