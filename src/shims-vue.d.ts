/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-12 08:40:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 07:49:29
 * @FilePath: \three-map-demo\src\shims-vue.d.ts
 * @Description: 导入文件配置器
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import Vue from 'vue'
  const component: DefineComponent<{}, {}, any> | Vue
  export default component
}

declare module '*'
