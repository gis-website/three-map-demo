import * as THREE from 'three'

const blowuniform = {
  u_color: { value: new THREE.Color('#00ff51') },
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
  u_color: { value: new THREE.Color('#1800ff') },
  u_r: { value: 0.25 },
  u_length: { value: 20 }, // 扫过区域
  u_max: { value: 30 } // 扫过最大值
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
 * @description: 过渡
 * @return {*}
 */
export const blowMaterial = new THREE.ShaderMaterial({
  vertexShader: blowShader.vertexShader,
  fragmentShader: blowShader.fragmentShader,
  side: THREE.DoubleSide,
  uniforms: blowuniform,
  transparent: true,
  depthWrite: false
})

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

export const haloShader = {
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
  
      gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
  
    }
                `
}

export const routationLineShader = {
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

export const rippleShader = {
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
