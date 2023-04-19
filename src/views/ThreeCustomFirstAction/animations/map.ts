
import { gradientRampMaterial, blowMaterial } from '../base/shader'
import * as THREE from 'three'
import { projection, scene, map } from '../base/baseObj'

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
          color: '#ccc',
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
        const material = new THREE.MeshBasicMaterial({
          color: '#826c00',
          transparent: true,
          opacity: 1
        })
        const mesh = new THREE.Mesh(geometry, [material, blowMaterial])
        const line = new THREE.Line(lineGeometry, lineMaterial)
        province.properties = elem.properties
        mesh.position.set(0, 0, 0)
        line.position.set(0, 0, 2)
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