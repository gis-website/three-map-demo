#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tAudioData;
varying vec2 vUv;

void main(){
    
    vec3 backgroundColor=vec3(.125,.125,.125);
    vec3 color=vec3(1.,1.,0.);
    
    float f=texture2D(tAudioData,vec2(vUv.x,0.)).r;
    
    float i=step(vUv.y,f)*step(f-.0125,vUv.y);
    
    gl_FragColor=vec4(mix(backgroundColor,color,i),1.);
    
}