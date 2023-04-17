import * as THREE from 'three'
import { scene, camera, control, renderer, axes } from './composables/baseObj'
import { lineShader } from './composables/shader'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

const commonUniforms = {
  u_time: { value: 0.0 }
}

export const initRender = () => {
  const curves = initCircleCurveGroup(10, 15, 15)

  for (const curve of curves) {
    createFlyLine(curve, {
      speed: 0.2,
      number: Math.floor(Math.random() * 9 + 1),
      color: randomVec3Color(),
      size: 4.0
    }, 18000, 1, { x: 0, y: 0, z: 0 })
  }
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  commonUniforms.u_time.value += 0.01
  renderer.render(scene, camera)
}

// 随机颜色值
const randomVec3Color = () => {
  return new THREE.Vector3(
    Math.random() * 0.6 + 0.4,
    Math.random() * 0.6 + 0.4,
    Math.random() * 0.6 + 0.4
  )
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
const createFlyLine = (curve: any, matSetting: any, pointsNumber: any, type: any, position: any) => {
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
  scene.add(flyLine)
}

/**
 * @description:
 * @param {any} setting
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
    vertexShader: lineShader.vertexShader,
    fragmentShader:
    lineShader.fragmentShader,
    transparent: true
    // blending:THREE.AdditiveBlending,
  })
  return lineMaterial
}

/**
 * @description: 随机生成圆弧
 * @param {any} number 生成的个数
 * @param {any} xr x半径
 * @param {any} yr y半径
 * @return {*}
 */
const initCircleCurveGroup = (number: any, xr: any, yr: any) => {
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
