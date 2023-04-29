<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-28 13:43:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-29 20:59:02
 * @FilePath: \three-map-demo\src\Animations\AnimationAudio\AnimationAudio.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="map-content">
    <!-- <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
      <el-button type="primary" class="click"
      @click="handleClick">Primary</el-button> -->
    <!-- <audio class="audio" controls src="2.map3"></audio> -->
    <audio class="audio" controls src="./music/2.mp3">
      <!-- <source src="2.mp3" type="audio/mpeg"/> -->
    </audio>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { init, playMusic } from './index'
import { renderer } from '@/base/baseObj'

const myMap = ref()

const handleClick = (): void => {
  // playMusic()
}

onMounted(() => {
  // myMap.value.appendChild(renderer.domElement)
  // init()
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

  .click {
    position: absolute;
    top: 0;
    left: 0;
  }

  .audio {
    position: absolute;
    top: 0;
    left: 200px;
  }
}
</style>
