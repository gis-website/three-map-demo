<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-05-05 14:34:33
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-06 15:14:47
 * @FilePath: \three-map-demo\src\Animations\AnimationBuildRipple\AnimationBuildRipple.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="map-content">
    <div id="myMap" ref="myMap"></div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { renderer } from '@/base/baseObj'
import { init } from './index'

const myMap = ref()
onMounted(() => {
  myMap.value.appendChild(renderer.domElement)

  init()
})

</script>

<style lang="less" scoped>
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
