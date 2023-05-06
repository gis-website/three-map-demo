#ifdef GL_ES
precision mediump float;
#endif
uniform vec3 u_TopColor;
uniform float u_Height;
varying vec3 v_Position;
uniform float u_ToTopTime;
uniform float u_ToTopWidth;

void main(){
    vec4 distGradColor=gl_FragColor;
    
    // 设置混合的百分比
    float gradMix=v_Position.y/u_Height;
    float ToTopMix=-(v_Position.y-u_ToTopTime)*(v_Position.y-u_ToTopTime)+u_ToTopWidth;
    // 计算出混合颜色
    vec3 gradMixColor=mix(distGradColor.xyz,u_TopColor,gradMix);
    
    if(ToTopMix>0.){
        gl_FragColor=mix(gl_FragColor,vec4(0.8824, 0.0, 1.0, 1.0),ToTopMix/u_ToTopWidth);
    }
    else {
    gl_FragColor=vec4(gradMixColor,1);

    }
}