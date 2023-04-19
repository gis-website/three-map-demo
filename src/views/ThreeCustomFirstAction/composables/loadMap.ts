/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 18:54:23
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 14:56:42
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\composables\loadMap.ts
 * @Description: map service
 */
import { createBaseMap, displayName } from '../animations/map'
import { getJsonChinaData } from '@/api'
import { loadAureole } from './loadAureole'
import { loadLightCross } from './loadPlane'

/**
 * @description: 获取底图数据
 * @param {*} Promise
 * @return {*}
 */
export const getMap = async (): Promise<void> => {
  const china = await getJsonChinaData()
  createBaseMap(china)
  displayName(china)
  loadAureole(china)
  loadLightCross(china)
}
