<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-12 08:40:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-06 15:18:04
 * @FilePath: \three-map-demo\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEat
-->
<template>
  <!-- <AnimationGradientRampRectangle/> -->
  <!-- <AnimationRippleRectangle/> -->
  <AnimationUpDownGradient/>
  <!-- <AnimationAudio/> -->
  <!-- <AnimationBuildRipple/> -->
  <!-- <AnimationAddModel/> -->

  <!-- <ThreeCustomFirstAction/> -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import AnimationGradientRampRectangle from './Animations/AnimationGradientRampRectangle/AnimationGradientRampRectangle'
import AnimationRippleRectangle from './Animations/AnimationRippleRectangle/AnimationRippleRectangle'
import AnimationAudio from './Animations/AnimationAudio/AnimationAudio'

import ThreeCustomFirstAction from './views/ThreeCustomFirstAction/ThreeCustomFirstAction'
import AnimationAddModel from './Animations/AnimationAddModel/AnimationAddModel'
import AnimationBuildRipple from './Animations/AnimationBuildRipple/AnimationBuildRipple'
import AnimationUpDownGradient from './Animations/AnimationUpDownGradient/AnimationUpDownGradient'

@Options({
  components: {
    // AnimationGradientRampRectangle
    // AnimationRippleRectangle
    AnimationUpDownGradient
    // AnimationAddModel
    // AnimationAudio
    // AnimationBuildRipple

    // ThreeCustomFirstAction
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
