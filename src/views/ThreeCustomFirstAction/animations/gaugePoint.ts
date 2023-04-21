/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 20:46:44
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-20 14:04:05
 * @FilePath: \three-map-demo\src\views\Animation\AnimationGaugePoint\composables\gaugePoint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, projection } from '../base/baseObj'
import gsap from 'gsap'

export const createGaugePoint = (mapData: any) => {
  const group = new THREE.Group()

  mapData.features.forEach((d: any, i: number) => {
    const lnglat = d.properties.center

    if (lnglat === undefined) {
      return
    }

    const [x, y] = projection(lnglat)

    const texture = new THREE.TextureLoader().load('./images/gradual_change_red_02.png')

    const geometry = new THREE.ConeGeometry(0.5, 2, 32)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      map: texture
    })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.x = x
    sphere.position.y = -y
    sphere.position.z = 3.5
    sphere.rotation.x = -Math.PI * 0.5
    sphere.layers.enable(1)
    sphere.properties = d.properties
    sphere.visible = false
    gsap.to(sphere.scale, {
      duration: 1,
      x: 1.5,
      y: 1.5,
      z: 1.5,
      repeat: -1,
      delay: 1,
      yoyo: true,
      ease: 'power2.inOut'
    })
    group.add(sphere)
  })
  group.rotation.x = -Math.PI * 0.5 * 0.5

  group.name = 'gaugePoint'

  scene.add(group)

  // let s = 0
  // let p = 0
  // let tag = true
  // function render () {
  //   // animation
  //   if (s > 80) {
  //     s = 0
  //     tag = !tag
  //   }
  //   sphere.position.y = tag
  //     ? position.y + s / 40
  //     : position.y + 2 - s / 40
  //   sphere.rotation.y = p / 30
  //   mesh.scale.set(
  //     tag ? 1 + s / 80 : 2 - s / 80,
  //     tag ? 1 + s / 80 : 2 - s / 80,
  //     1
  //   )
  //   s++
  //   p++
  //   requestAnimationFrame(render)
  // }
  // render()
}
