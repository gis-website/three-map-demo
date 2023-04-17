/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-15 15:25:55
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-15 17:03:50
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPointRotation\composables\shader.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'

const pointUniform = {
  u_color: { value: new THREE.Color('#7300ff') },
  u_tcolor: { value: new THREE.Color('#006dff') },
  u_r: { value: 0.25 },
  u_length: { value: 20 }, // 扫过区域
  u_max: { value: 30 } // 扫过最大值
}
const pointShader = {
  vertexShader: ` 
  uniform float u_r;
  void main() {
    varying vec3 vp;
    vp = position; 
    gl_PointSize = u_r
    gl_Position = vec4(position, 1.0)
  }
              `,
  fragmentShader: `
void main() {
    if (distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) discard;
    gl_FragColor = vec4(1,0,0,1)
}
                `
}

/**
 * @description: 点
 * @return {*}
 */
export const pointMaterial = new THREE.ShaderMaterial({
  vertexShader: pointShader.vertexShader,
  fragmentShader: pointShader.fragmentShader,
  side: THREE.DoubleSide,
  uniforms: pointUniform,
  transparent: true,
  depthWrite: false
})
