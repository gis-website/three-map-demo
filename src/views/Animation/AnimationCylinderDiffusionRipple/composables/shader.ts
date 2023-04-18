/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 10:43:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 15:54:37
 * @FilePath: \three-map-demo\src\views\Animation\AnimationHalo\composables\shader.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const shader = {
  vertexShader: ` 
    varying vec2 vUv;
  
    void main() {
  
      vUv = uv;
  
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  
    }
              `,
  fragmentShader: `
    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;
  
    varying vec2 vUv;
  
    void main() {
  
      gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 0.5 ) * texture2D( bloomTexture, vUv ) );
  
    }
                `
}
