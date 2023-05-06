#ifdef GL_ES
precision mediump float;
#endif
uniform vec3 u_TopColor;
uniform float u_Height;
varying vec3 v_Position;

void main(){
    vec4 distGradColor=gl_FragColor;
    
    // 设置混合的百分比
    float gradMix=v_Position.y/u_Height;
    // 计算出混合颜色
    vec3 gradMixColor=mix(distGradColor.xyz,u_TopColor,gradMix);
    gl_FragColor=vec4(gradMixColor,1);
}