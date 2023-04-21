import { createGaugePoint } from '../animations/gaugePoint'
import { scene, projection } from '../base/baseObj'

let plane:any
let gaugePoint:any

export const loadGaugePoint = (obj:any):void => {
  createGaugePoint(obj)
}

export const showGaugePoint = (obj:any): void => {
  if (plane !== undefined) {
    plane.visible = true
  }
  if (gaugePoint !== undefined) {
    gaugePoint.visible = false
  }
  const groupPlane = scene.getObjectByName('lightCross')
  const groupGaugePoint = scene.getObjectByName('gaugePoint')

  console.log(obj)
  console.log(groupPlane)
  console.log(obj.object.parent.properties.name)
  plane = groupPlane.children.find((item:any) => item.properties.name === obj.object.parent.properties.name)

  gaugePoint = groupGaugePoint.children.find((item:any) => item.properties.name === obj.object.parent.properties.name)

  if (plane !== undefined) {
    plane.visible = false
  }

  if (gaugePoint !== undefined) {
    gaugePoint.visible = true
  }
}
