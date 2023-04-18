<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-12 08:40:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 15:09:33
 * @FilePath: \three-map-demo\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <AnimationAureole/> -->
  <!-- <ThreeMapAction/> -->
  <!-- <AnimationPointRotation/> -->
  <!-- <AnimationVideo/> -->
  <!-- <AnimationHalo/> -->
  <!-- <AnimationRotationLine/> -->
  <!-- <AnimationGaugePoint/> -->
  <!-- <AnimationAddModel/> -->
  <!-- <AnimationPointSky/> -->
  <!-- <AnimationProtectiveCover/> -->
  <AnimationCylinderDiffusionRipple/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AnimationAureole from './views/Animation/AnimationAureole/AnimationAureole'
import ThreeMapAction from './views/ThreeMapAction/ThreeMapAction'
import AnimationPointRotation from './views/Animation/AnimationPointRotation/AnimationPointRotation'
import AnimationVideo from '@/views/Animation/AnimationVideo/AnimationVideo'
import AnimationHalo from './views/Animation/AnimationHalo/AnimationHalo'
import AnimationRotationLine from './views/Animation/AnimationRotationLine/AnimationRotationLine'
import AnimationGaugePoint from './views/Animation/AnimationGaugePoint/AnimationGaugePoint'
import AnimationAddModel from './views/Animation/AnimationAddModel/AnimationAddModel'
import AnimationPointSky from './views/Animation/AnimationPointSky/AnimationPointSky'
import AnimationProtectiveCover from './views/Animation/AnimationProtectiveCover/AnimationProtectiveCover'
import AnimationCylinderDiffusionRipple from './views/Animation/AnimationCylinderDiffusionRipple/AnimationCylinderDiffusionRipple'

@Options({
  components: {
    AnimationAureole,
    ThreeMapAction,
    AnimationPointRotation,
    AnimationVideo,
    AnimationHalo,
    AnimationRotationLine,
    AnimationGaugePoint,
    AnimationAddModel,
    AnimationPointSky,
    AnimationProtectiveCover,
    AnimationCylinderDiffusionRipple
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e;
  height: 100%;
  width: 100%;
}
</style>
