import * as THREE from 'three'

const blowuniform = {
  u_color: { value: new THREE.Color('#ffde00') },
  u_tcolor: { value: new THREE.Color('#006dff') },
  u_r: { value: 0.25 },
  u_length: { value: 20 }, // 扫过区域
  u_max: { value: 30 } // 扫过最大值
}
const blowShader = {
  vertexShader: ` 
    precision highp float;
                varying vec3 vp;
                void main(){
                vp = position; 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
  fragmentShader: `
                  varying vec3 vp;
                  uniform vec3 u_color;
                  uniform vec3 u_tcolor;
                  uniform float u_r;
                  uniform float u_length;
                  uniform float u_max;
                  float getRadius(float x, float y){
                      return  sqrt((x-0.0)*(x-0.0)+(y-0.0)*(y-0.0));
                  }
                  void main(){
                      float uOpacity = 0.3;
                      vec3 vColor = u_color;
                      float uLength = getRadius(vp.x,vp.y);
                      if ( uLength <= u_r && uLength > u_r - u_length ) {
                          float op = sin( (u_r - uLength) / u_length ) * 0.6 + 0.3 ;
                          uOpacity = op;
                          if( vp.y<0.0){
                              vColor  = u_tcolor * 0.6;
                          }else{
                              vColor = u_tcolor;
                          };
                      }
                      gl_FragColor = vec4(vColor,uOpacity);
                  }
              `
}

const gradientRampuniform = {
  u_color: { value: new THREE.Color('#7300ff') }
}
const gradientRampShader = {
  vertexShader: ` 
      precision highp float;
                  varying vec3 vp;
                  void main(){
                  vp = position; 
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
              `,
  fragmentShader: `
              varying vec3 vp;
              uniform vec3 u_color;
              uniform vec3 u_tcolor;
              uniform float u_r;
              void main(){
                  gl_FragColor = vec4(u_color,1.0 - (1.0 - vp.z)*(1.0 - vp.z));
              }
          `
}

const lightPillarUniform = {
  u_color: { value: new THREE.Color('#ff1e00') },
  u_tcolor: { value: new THREE.Color('#ff9800') },
  u_r: { value: 0.25 },
  u_length: { value: 20 }, // 扫过区域
  u_max: { value: 30 } // 扫过最大值
}

const lightPillarShader = {
  vertexShader: `
      varying vec3 vp;
      void main() {
          vp = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
      }
       `,
  //   fragmentShader: `
  //     uniform vec3 u_color;
  //     uniform float height;
  //     varying vec3 modelPos;

  //     void main() {
  //        gl_FragColor = vec4(u_color,(1.0 - modelPos.z)*(1.0 - modelPos.z));
  //     }
  //     `

  fragmentShader: `
                  varying vec3 vp;
                  uniform vec3 u_color;
                  uniform vec3 u_tcolor;
                  uniform float u_r;
                  uniform float u_length;
                  uniform float u_max;
                  float getLeng(float x, float y){
                      return  sqrt((x-0.0)*(x-0.0)+(y-0.0)*(y-0.0));
                  }
                  void main(){
                      float uOpacity = 0.3;
                      vec3 vColor = u_color;
                      float uLength = getLeng(vp.x,vp.y);
                      if ( uLength <= u_r && uLength > u_r - u_length ) {
                          float op = sin( (u_r - uLength) / u_length ) * 0.6 + 0.3 ;
                          uOpacity = op;
                          if( vp.z<0.0){
                              vColor  = u_tcolor * 0.6;
                          }else{
                              vColor = u_tcolor;
                          };
                      }
                      gl_FragColor = vec4(vColor,uOpacity);
                  }
              `
}

/**
 * @description: 渐变色
 * @return {*}
 */
export const gradientRampMaterial = new THREE.ShaderMaterial({
  vertexShader: gradientRampShader.vertexShader,
  fragmentShader: gradientRampShader.fragmentShader,
  side: THREE.DoubleSide,
  uniforms: gradientRampuniform,
  transparent: true,
  depthWrite: false
})

/**
 * @description: 波纹
 * @return {*}
 */
export const blowMaterial = new THREE.ShaderMaterial({
  vertexShader: blowShader.vertexShader,
  fragmentShader: blowShader.fragmentShader,
  side: THREE.DoubleSide,
  uniforms: blowuniform,
  transparent: true,
  // opacity: 0,
  depthWrite: false
})

/**
 * @description: 光柱
 * @return {*}
 */
export const lightPillarMaterial = new THREE.ShaderMaterial({
  vertexShader: lightPillarShader.vertexShader,
  fragmentShader: lightPillarShader.fragmentShader,
  side: THREE.DoubleSide,
  uniforms: lightPillarUniform,
  transparent: true,
  depthWrite: false
})
