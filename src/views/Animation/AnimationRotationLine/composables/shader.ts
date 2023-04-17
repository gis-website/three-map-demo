/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 17:29:58
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-17 18:47:30
 * @FilePath: \three-map-demo\src\views\Animation\AnimationRotationLine\componsables\shader.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'

const lineuniform = {
  u_time: { value: 0.0 }
}
export const lineShader = {
  vertexShader: ` 
    varying vec2 vUv;
    attribute float percent;
    uniform float u_time;
    uniform float number;
    uniform float speed;
    uniform float length;
    varying float opacity;
    uniform float size;

    void main()
    {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        float l = clamp(1.0-length,0.0,1.0);//空白部分长度

        gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l ,0.0,1.) * size * (1./length);

        opacity = gl_PointSize/size;
        gl_Position = projectionMatrix * mvPosition;
    }
              `,
  fragmentShader: `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying float opacity;
    uniform vec3 color;

    void main(){
        if(opacity <=0.2){
            discard;
        }
        gl_FragColor = vec4(color,1.0);
    }
                `
}
