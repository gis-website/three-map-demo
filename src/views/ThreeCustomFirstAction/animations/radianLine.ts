import * as THREE from 'three'
import { scene } from '@/base/baseObj'
import vertexShader from '@/shader/radianLine/vertex.glsl'
import fragmentShader from '@/shader/radianLine/fragment.glsl'

/**
 * @description: 转动时间
 * @return {*}
 */
export const commonUniforms = {
  u_time: { value: 0.0 }
}

/**
   * @description: 随机生成圆弧
   * @param {any} number 生成的个数
   * @param {any} xr x半径
   * @param {any} yr y半径
   * @return {*}
   */
export const initCircleCurveGroup = (number: any, xr: any, yr: any) => {
  const curves = []

  for (let i = 0; i < number; i++) {
    const curve = new THREE.EllipseCurve(
      0, 0, // ax, aY
      xr + 5, yr + 5, // xRadius, yRadius
      0, 2 * Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0 // aRotation
    )
    curves.push(curve)
  }
  return curves
}

/**
   * @description: 创建圆弧(非完整圆)
   * @param {any} curve 圆弧
   * @param {any} matSetting 样式参数对象
   * @param {any} pointsNumber 点的数量
   * @param {any} type 类型
   * @param {any} position 位置
   * @return {*}
   */
export const createFlyLine = (curve: any, matSetting: any, pointsNumber: any, type: any, position: any) => {
  const points = curve.getPoints(pointsNumber)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  const length = points.length
  const percents = new Float32Array(length)
  for (let i = 0; i < points.length; i += 1) {
    percents[i] = i / length
  }

  geometry.attributes.percent = new THREE.BufferAttribute(percents, 1)

  const lineMaterial = initLineMaterial(matSetting)

  const flyLine = new THREE.Points(geometry, lineMaterial)
  const euler = new THREE.Euler( // 有弧度的曲线
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0
  )
  if (type === 1) {
    flyLine.setRotationFromEuler(euler)
  }
  flyLine.position.x = position.x
  flyLine.position.y = position.y
  flyLine.position.z = position.z
  if (type !== 1) {
    flyLine.rotation.x = Math.PI / 2
  }
  flyLine.layers.enable(1)

  scene.add(flyLine)
}

/**
 * @description: 随机颜色值
 * @return {*}
 */
export const randomVec3Color = () => {
  return new THREE.Vector3(
    Math.random() * 0.6 + 0.4,
    Math.random() * 0.6 + 0.4,
    Math.random() * 0.6 + 0.4
  )
}

/**
   * @description: 弧线样式
   * @param {any} setting 设置参数
   * @return {*}
   */
const initLineMaterial = (setting: any) => {
  const number = setting ? Number(setting.number) || 1.0 : 1.0 // 在一个路径中同时存在的个数
  const speed = setting ? Number(setting.speed) || 1.0 : 1.0 // 速度约大越快
  const length = setting ? Number(setting.length) || 0.5 : 0.5 // 单根线的长度0-1之间1代表全满
  const size = setting ? Number(setting.size) || 3.0 : 3.0 // 在最大的地方的大小 默认为3像素
  const color = setting
    ? setting.color || new THREE.Vector3(0, 1, 1)
    : new THREE.Vector3(0, 1, 1) // 颜色此处以Vector
  const singleUniforms = {
    u_time: commonUniforms.u_time,
    number: { type: 'f', value: number },
    speed: { type: 'f', value: speed },
    length: { type: 'f', value: length },
    size: { type: 'f', value: size },
    color: { type: 'v3', value: color }
  }
  const lineMaterial = new THREE.ShaderMaterial({
    uniforms: singleUniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending
  })
  return lineMaterial
}
