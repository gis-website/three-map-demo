
import * as THREE from 'three'
import { projection, scene, map } from '@/base/baseObj'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import rippleVertex from '@/shader/ripple/vertex.glsl'
import rippleFragment from '@/shader/ripple/fragment.glsl'
import gradientRampVertex from '@/shader/gradientRamp/vertex.glsl'
import gradientRampFragment from '@/shader/gradientRamp/fragment.glsl'

const blowuniform = {
  u_color: { value: new THREE.Color('#00abad') },
  u_tcolor: { value: new THREE.Color('#c8ff00') },
  u_r: { value: 0.25 },
  u_length: { value: 20 } // 扫过区域
}

const gradientRampuniform = {
  u_color: { value: new THREE.Color('#1800ff') }
}

export const blowMaterial = new THREE.ShaderMaterial({
  vertexShader: rippleVertex,
  fragmentShader: rippleFragment,
  side: THREE.DoubleSide,
  uniforms: blowuniform,
  transparent: true,
  depthWrite: false
})

export const gradientRampMaterial = new THREE.ShaderMaterial({
  vertexShader: gradientRampVertex,
  fragmentShader: gradientRampFragment,
  side: THREE.DoubleSide,
  uniforms: gradientRampuniform,
  transparent: true,
  depthWrite: false
})

/**
 * @description: 初始化目标地图
 * @param {any} jsondata 地图数据
 * @param {any} scene 场景对象
 * @return {*}
 */
export const createTargetMap = (jsondata: any):void => {
  jsondata.features.forEach((elem: any) => {
    // 定一个省份3D对象
    const province = new THREE.Object3D()

    // 每个的 坐标 数组
    const coordinates = elem.geometry.coordinates
    // 循环坐标数组
    coordinates.forEach((multiPolygon: any) => {
      multiPolygon.forEach((polygon: any) => {
        const shape = new THREE.Shape()
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 'white',
          linewidth: 10,
          linecap: 'round', // ignored by WebGLRenderer
          linejoin: 'round' // ignored by WebGLRenderer
        })

        const lineGeometry = new THREE.BufferGeometry()
        const points = [] as any
        for (let i = 0; i < polygon.length; i++) {
          const [x, y] = projection(polygon[i])
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
          points.push(new THREE.Vector3(x, -y, 1))
        }
        lineGeometry.setFromPoints(points)
        const extrudeSettings = {
          depth: 1,
          bevelEnabled: false
        }
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        const material = new THREE.MeshBasicMaterial({
          color: '#2defff',
          transparent: true,
          opacity: 0.6
        })

        const mesh = new THREE.Mesh(geometry, [material, gradientRampMaterial])
        const line = new THREE.Line(lineGeometry, lineMaterial)
        province.properties = elem.properties
        mesh.position.set(0, 0, 0)
        province.add(mesh)
        province.add(line)
        map.add(province)
      })
    })
  })
  scene.add(map)
}

/**
 * @description: 初始化底图
 * @param {any} mapData 地图数据
 * @param {any} scene 场景对象
 * @return {*}
 */
export const createBaseMap = (mapData: any) => {
  mapData.features.forEach((elem: any) => {
    // 定一个省份3D对象
    const province = new THREE.Object3D()

    // 每个的 坐标 数组
    const coordinates = elem.geometry.coordinates
    // 循环坐标数组
    coordinates.forEach((multiPolygon: any) => {
      multiPolygon.forEach((polygon: any) => {
        const shape = new THREE.Shape()
        const lineMaterial = new THREE.LineBasicMaterial({
          side: THREE.DoubleSide,
          depthTest: false,
          color: '#007eff',
          transparent: true,
          opacity: 1
        })

        const lineGeometry = new THREE.BufferGeometry()
        const points = [] as any
        for (let i = 0; i < polygon.length; i++) {
          const [x, y] = projection(polygon[i])
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
          points.push(new THREE.Vector3(x, -y, 0))
        }
        lineGeometry.setFromPoints(points)
        const extrudeSettings = {
          depth: 2,
          bevelEnabled: false
        }
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        // 如果要改不同的颜色表示省份，修改这条material的颜色为随机
        // 注意拾取那颜色的逻辑也要改，得保存没个material的原始颜色
        const material = new THREE.MeshBasicMaterial({
          color: '#002642',
          transparent: true,
          opacity: 1
        })
        const mesh = new THREE.Mesh(geometry, [material, blowMaterial])
        const line = new THREE.Line(lineGeometry, lineMaterial)
        province.properties = elem.properties
        mesh.position.set(0, 0, 0)
        line.position.set(0, 0, 2)
        line.layers.enable(1)
        mesh.name = 'china'
        province.name = 'china'
        province.add(mesh)
        province.add(line)
        map.add(province)
      })
    })
  })
  map.name = 'china'
  map.rotation.x = -Math.PI * 0.5 * 0.5
  // map.scale.x = 0.5 * 0.5
  // map.scale.y = 0.5 * 0.5
  // map.scale.z = 0.5 * 0.5
  scene.add(map)
}

/**
 * @description: 初始化底图
 * @param {any} mapData 地图数据
 * @param {any} scene 场景对象
 * @return {*}
 */
export const displayName = (mapData: any) => {
  const group = new THREE.Group()
  const loader = new FontLoader()

  loader.load('fonts/custom_Regular.json', function (font:any) {
    mapData.features.forEach((d: any, i: number) => {
      const lnglat = d.properties.center

      if (lnglat === undefined) {
        return
      }
      const color = 0xffffff
      const [x, y] = projection(lnglat)
      const matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      })

      const shapes = font.generateShapes(d.properties.name, 1)
      const geometry = new THREE.ShapeGeometry(shapes)

      geometry.computeBoundingBox()

      const text = new THREE.Mesh(geometry, matLite)
      text.position.x = x
      text.position.y = -y
      text.position.z = 2.3
      text.scale.x = 0.3
      text.scale.y = 0.3
      group.add(text)
    })
  })

  group.rotation.x = -Math.PI * 0.5 * 0.5
  scene.add(group)
}
