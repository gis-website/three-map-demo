import * as THREE from 'three'
import { projection, scene } from '../base/baseObj'

const mapColorsArr = ['#fff', '#ff0']
const mapGroup = new THREE.Group()
const sixPlaneGroup = new THREE.Group()
const sixLineGroup = new THREE.Group()

/**
 * @description:  Init light cross
 * @param {any} mapData place data
 * @return {*}
 */
export const createLightCross = (mapData: any) => {
  mapData.features.forEach((d: any, i: number) => {
    const lnglat = d.properties.center

    if (lnglat === undefined) {
      return
    }

    const [x, y] = projection(lnglat)
    // 绘制六边体
    sixPlaneGroup.add(drawSixMesh(x, -y, 2, i))
    // 绘制6边线
    sixLineGroup.add(drawSixLineLoop(x, -y, 2, i))

    // 绘制柱子
    const plane = drawPlane(x, -y, 3.5)
    plane.properties = d.properties
    mapGroup.add(plane)
  })
  mapGroup.rotation.x = -Math.PI * 0.5 * 0.5
  sixPlaneGroup.rotation.x = -Math.PI * 0.5 * 0.5
  sixLineGroup.rotation.x = -Math.PI * 0.5 * 0.5

  mapGroup.name = 'lightCross'

  scene.add(mapGroup)
  scene.add(sixPlaneGroup)
  scene.add(sixLineGroup)
}

const drawPlane = (x: any, y: any, z: any) => {
  const textures =
      new THREE.TextureLoader().setPath('/images/').load('light-cross.png')
  const lightPillarGeometry = new THREE.PlaneGeometry(1, 5)
  const lightPillarMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: textures,
    alphaMap: textures,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  })

  const lightPillar = new THREE.Mesh(lightPillarGeometry, lightPillarMaterial)
  lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2))

  lightPillar.position.set(x, y, z)
  lightPillar.rotation.x = Math.PI * 0.5

  return lightPillar
}

/**
   * @description: draw hexagon polygon
   * @param {any} x x axis
   * @param {any} y y axis
   * @param {any} z z axis
   * @param {any} i index
   * @param {*} size hexagon size
   * @return {*} hexagon
   */
const drawSixMesh = (x: any, y: any, z: any, i: any, size = 6) => {
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
/**
   * @description: draw hexagon line
   * @param {any} x x axis
   * @param {any} y y axis
   * @param {any} z z axis
   * @param {any} i index
   * @return {*} line
   */
const drawSixLineLoop = (x: any, y: any, z: any, i: any) => {
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
