import * as THREE from 'three'
import { scene } from '@/base/baseObj'

const range = 200 // 范围
const count = 80 // 个数

export const createPointFloat = ():void => {
  const loader = new THREE.TextureLoader()
  loader.setPath('./images/').load('snow.png', (texture: any) => {
    const material = new THREE.PointsMaterial({
      map: texture, // 纹理
      transparent: true, // 透明
      size: 5,
      color: '#00aeff',
      depthWrite: false
    })
    const velocity = [] as any
    const vertices = [] as any
    const geometry = new THREE.BufferGeometry()
    // 通过自定义几何体设置粒子位置
    for (let i = 0; i < count; i++) {
      // 随机生成粒子的位置
      vertices.push(THREE.MathUtils.randFloatSpread(200)) // x
      vertices.push(THREE.MathUtils.randFloatSpread(200)) // y
      vertices.push(THREE.MathUtils.randFloatSpread(200)) // z
      velocity.push((Math.random() - 0.5) / 3)
      velocity.push(Math.random() / 5)
      velocity.push((Math.random() - 0.5) / 3)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    const points = new THREE.Points(geometry, material)
    points.layers.enable(1)
    points.name = 'point'
    scene.add(points)

    const render = () => {
      requestAnimationFrame(render)
      const array = points.geometry.attributes.position.array
      for (let index = 0; index < 80; index++) {
        const i = index * 3
        array[i] += velocity[i]
        array[i + 1] += velocity[i + 1]
        array[i + 2] += velocity[i + 2]
        // 边界检查
        if (array[i + 1] >= range / 2) {
          array[i + 1] = -range / 2
        }
        if (array[i] <= -range / 2 || array[i] >= range / 2) array[i] = array[i] * -1
        if (array[i + 2] <= -range / 2 || array[i + 2] >= range / 2) array[i + 2] = array[i + 2] * -1
        geometry.attributes.position.needsUpdate = true
      }
    }
    render()
  })
}
