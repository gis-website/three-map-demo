#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 u_defaultColor;
uniform vec3 u_changeColor;
uniform float u_time;
varying vec2 vUv;

void main(){
    
    vec3 col=u_defaultColor+(u_changeColor-u_defaultColor)*cos(u_time-vUv.y);
    
    gl_FragColor=vec4(col,1.);
}