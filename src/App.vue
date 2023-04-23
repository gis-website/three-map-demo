<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-12 08:40:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 15:09:53
 * @FilePath: \three-map-demo\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEat
-->
<template>
  <!-- <AnimationAddModel/> -->
  <!-- <AnimationAureole/> -->
  <!-- <AnimationCylinderDiffusionRipple/> -->
  <!-- <AnimationEarth/> -->
  <!-- <AnimationGaugePoint/> -->
  <!-- <AnimationOutline/> -->
  <!-- <AnimationPlane/> -->
  <!-- <AnimationPointFloatUp/> -->
  <!-- <AnimationPointSky/> -->
  <!-- <AnimationProtectiveCover/> -->
  <!-- <AnimationRadianLine/> -->
  <!-- <AnimationRipple/> -->
  <!-- <AnimationVideo/> -->

  <ThreeCustomFirstAction/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AnimationAddModel from './views/Animation/AnimationAddModel/AnimationAddModel'
import AnimationAureole from './views/Animation/AnimationAureole/AnimationAureole'
import AnimationCylinderDiffusionRipple from './views/Animation/AnimationCylinderDiffusionRipple/AnimationCylinderDiffusionRipple'
import AnimationEarth from './views/Animation/AnimationEarth/AnimationEarth'
import AnimationGaugePoint from './views/Animation/AnimationGaugePoint/AnimationGaugePoint'
import AnimationOutline from './views/Animation/AnimationOutline/AnimationOutline'
import AnimationPlane from './views/Animation/AnimationPlane/AnimationPlane'
import AnimationPointFloatUp from './views/Animation/AnimationPointFloatUp/AnimationPointFloatUp'
import AnimationPointSky from './views/Animation/AnimationPointSky/AnimationPointSky'
import AnimationProtectiveCover from './views/Animation/AnimationProtectiveCover/AnimationProtectiveCover'
import AnimationRadianLine from './views/Animation/AnimationRadianLine/AnimationRadianLine'
import AnimationRipple from './views/Animation/AnimationRipple/AnimationRipple'
import AnimationVideo from '@/views/Animation/AnimationVideo/AnimationVideo'

import ThreeCustomFirstAction from './views/ThreeCustomFirstAction/ThreeCustomFirstAction'

@Options({
  components: {
    // AnimationAddModel,
    // AnimationAureole,
    // AnimationCylinderDiffusionRipple,
    // AnimationEarth
    // AnimationGaugePoint
    // AnimationOutline
    // AnimationPlane
    // AnimationPointFloatUp
    // AnimationPointSky
    // AnimationProtectiveCover
    // AnimationRadianLine
    // AnimationRipple
    // AnimationVideo

    ThreeCustomFirstAction
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
