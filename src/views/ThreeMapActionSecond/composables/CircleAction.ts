/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-13 08:38:12
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 17:46:06
 * @FilePath: \three-map-demo\src\components\CircleAction.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { projection } from './baseObj'
import { gradientRampMaterial, blowMaterial, lightPillarMaterial } from './shader'

export const initCircle = (jsondata: any, scene: any, map: any):void => {
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
          linewidth: 1,
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
        mesh.position.set(0, 0, 1)
        line.position.set(0, 0, 1)

        province.add(mesh)
        province.add(line)
        map.add(province)
      })
    })
  })
  scene.add(map)
}

export const circleAnimation = (dalte: any) => {
  if (blowMaterial) {
    blowMaterial.uniforms.u_r.value += dalte * 50
    if (blowMaterial.uniforms.u_r.value >= 300) {
      blowMaterial.uniforms.u_r.value = 20
    }
  }
}

/**
 * @desc 绘制地图，中国地图
 */
export const drawMapChina = (mapData: any, scene: any) => {
  // 把经纬度转换成x,y,z 坐标
  mapData.features.forEach((d: any) => {
    d.vector3 = []
    d.geometry.coordinates.forEach((coordinates: any, i: number) => {
      d.vector3[i] = []
      coordinates.forEach((c: any, j: number) => {
        if (c[0] instanceof Array) {
          d.vector3[i][j] = []
          c.forEach((cinner: any) => {
            const cp = projection(cinner)
            d.vector3[i][j].push(cp)
          })
        } else {
          const cp = projection(c)
          d.vector3[i].push(cp)
        }
      })
    })
  })

  // 绘制地图模型
  const group = new THREE.Group()
  const lineGroup = new THREE.Group()
  mapData.features.forEach((d: any) => {
    const g = new THREE.Group() // 用于存放每个地图模块。||省份
    g.data = d
    d.vector3.forEach((points: any) => {
      // 多个面
      if (points[0][0] instanceof Array) {
        points.forEach((p: any) => {
          const mesh = drawModel(p, null, '#cccccc', 0.1)
          const lineMesh = drawLine(p)
          lineGroup.add(lineMesh)
          g.add(mesh)
        })
      } else {
        // 单个面
        const mesh = drawModel(points, null, '#cccccc', 0.1)
        const lineMesh = drawLine(points)
        lineGroup.add(lineMesh)
        g.add(mesh)
      }
    })
    group.add(g)
  })

  // lineGroup.position.y = 10
  // group.position.y = 0
  scene.add(group)
  scene.add(lineGroup)

  // lineGroup.rotation.x = -Math.PI / 2
  // group.rotation.x = -Math.PI / 2
}

/**
 * @desc 绘制地图模型 points 是一个二维数组 [[x,y], [x,y], [x,y]]
 */
function drawModel (
  points: any,
  modelHeight: any,
  modelColor: any,
  modelOpacity: any
) {
  if (modelHeight == null) {
    modelHeight = 1 // 模型高度
  }
  if (modelColor == null) {
    modelColor = '#006de0' // 颜色
  }
  if (modelOpacity == null) {
    modelOpacity = 0.6 // 透明度
  }
  const shape = new THREE.Shape()
  points.forEach((d: any, i: number) => {
    const [x, y] = d
    if (i === 0) {
      shape.moveTo(x, -y)
    }
    shape.lineTo(x, -y)
  })

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: modelHeight, // 模型高度
    bevelEnabled: false
  })
  //   const material = new THREE.MeshBasicMaterial({
  //     color: modelColor,
  //     transparent: true,
  //     opacity: modelOpacity,
  //     side: THREE.DoubleSide
  //   })
  const mesh = new THREE.Mesh(geometry, blowMaterial)
  return mesh
}

/**
 * @desc 绘制线条，地图、行政区域边界
 * @param {} points
 */
function drawLine (points: any) {
  const material = new THREE.LineBasicMaterial({
    side: THREE.DoubleSide,
    depthTest: false,
    color: '#ccc',
    transparent: true,
    opacity: 0.7
  })
  const geometry = new THREE.BufferGeometry()
  const list = [] as any
  points.forEach((d: any) => {
    const [x, y, z] = d
    list.push(new THREE.Vector3(x, -y, 1))
  })
  geometry.setFromPoints(list)
  const line = new THREE.Line(geometry, material)
  return line
}

/**
 * @desc 绘制光柱
 */
const mapColorsArr = ['#fff', '#ff0']
const mapGroup = new THREE.Group()
const sixPlaneGroup = new THREE.Group()
const sixLineGroup = new THREE.Group()
export const drawLightBar = (data: any, scene: any) => {
  data.features.forEach((d: any, i: number) => {
    const lnglat = d.properties.center
    const [x, y, z] = projection(lnglat)
    // 绘制六边体
    sixPlaneGroup.add(drawSixMesh(x, -y, 2, i))
    // 绘制6边线
    sixLineGroup.add(drawSixLineLoop(x, -y, 2, i))

    // 绘制柱子
    const plane1 = drawPlane(x, -y, 2, d.value, i)
    // mapGroup.add(plane2)
    mapGroup.add(plane1)
  })

  scene.add(mapGroup)
  scene.add(sixPlaneGroup)
  scene.add(sixLineGroup)
}

// function drawPlane (x: any, y: any, z: any, value: any, i: any) {
//   const texturesArr =
//     new THREE.TextureLoader().setPath('/images/').load('light-cross.png')
//   const lightPillarGeometry = new THREE.PlaneGeometry(0.5, 10)
//   const lightPillarMaterial = new THREE.MeshBasicMaterial({
//     color: 0xffffff,
//     map: texturesArr,
//     alphaMap: texturesArr,
//     transparent: true,
//     blending: THREE.AdditiveBlending,
//     side: THREE.DoubleSide,
//     depthWrite: false
//   })
//   const lightPillar = new THREE.Mesh(lightPillarGeometry, lightPillarMaterial)
//   lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2))
//   const segment = 64
//   let bottomPos = []
//   const topPos = []
//   const angleOffset = (Math.PI * 2) / segment
//   for (let i = 0; i < segment; i++) {
//     const x = Math.cos(angleOffset * i) * 0.01
//     const z = Math.sin(angleOffset * i) * 0.01
//     bottomPos.push(x, 0, z)
//     topPos.push(x, 1, z)
//   }
//   bottomPos = bottomPos.concat(topPos)

//   const face = []
//   for (let i = 0; i < segment; i++) {
//     if (i !== segment - 1) {
//       face.push(i + segment + 1, i, i + segment)
//       face.push(i, i + segment + 1, i + 1)
//     } else {
//       face.push(segment, i, i + segment)
//       face.push(i, segment, 0)
//     }
//   }

//   const geo = new THREE.BufferGeometry()
//   geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(bottomPos), 3))
//   geo.setIndex(new THREE.BufferAttribute(new Uint16Array(face), 1))

//   const plane = new THREE.Mesh(geo, lightPillarMaterial)
//   plane.position.set(x, y, 1)
//   lightPillar.position.set(x, y, 3)
//   plane.rotation.x = Math.PI / 2
//   lightPillar.rotation.x = Math.PI / 2
//   plane.rotation.z = Math.PI
//   lightPillar.rotation.z = Math.PI
//   return lightPillar
// }

function drawPlane (x: any, y: any, z: any, value: any, i: any) {
  const texturesArr =
    new THREE.TextureLoader().setPath('/images/').load('light-cross.png')
  const lightPillarGeometry = new THREE.PlaneGeometry(0.5, 10)
  const lightPillarMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texturesArr,
    alphaMap: texturesArr,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  })
  const lightPillar = new THREE.Mesh(lightPillarGeometry, lightPillarMaterial)
  lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2))

  lightPillar.position.set(x, y, 1)
  lightPillar.rotation.x = Math.PI * 0.5
  lightPillar.rotation.z = Math.PI * 0.5

  return lightPillar
}

/**
 * @desc 绘制6边形
 */
function drawSixMesh (x: any, y: any, z: any, i: any, size = 6) {
  const textureLoader = new THREE.TextureLoader()
  const tubeTexture = textureLoader.setPath('/MilkyWay/').load('dark-s_nz.jpg')
  // 纹理旋转
  //  tubeTexture.rotation = Math.PI/4;
  // 设置纹理的旋转中心，默认(0,0)
  // tubeTexture.center.set(0.5,0.5);
  // 设置阵列模式为 RepeatWrapping
  tubeTexture.wrapS = THREE.RepeatWrapping
  tubeTexture.wrapT = THREE.RepeatWrapping
  // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
  // 等价tubeTexture.repeat= new THREE.Vector2(20,1)
  // tubeTexture.repeat.x = 1;

  const geometry = new THREE.CircleGeometry(0.01, size)
  const material = new THREE.MeshBasicMaterial({
    map: tubeTexture,
    transparent: false,
    combine: 1,
    side: THREE.DoubleSide,
    depthTest: false,
    color: mapColorsArr[i % 2]
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)
  return mesh
}

/**
 * @desc 绘制6边线
 */
function drawSixLineLoop (x: any, y: any, z: any, i: any) {
  // 绘制六边型
  const geometry = new THREE.CircleGeometry(0.01, 6)
  const material = new THREE.MeshBasicMaterial({
    color: mapColorsArr[i % 2],
    transparent: true
  })
  const line = new THREE.LineLoop(geometry, material)
  line.position.set(x, y, z)
  return line
}
