#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
uniform float scale;
uniform vec3 color1;
uniform vec3 color2;

void main(){
    
    float dis=distance(vUv,vec2(.5,.5));
    
    float opacity=smoothstep(.4*scale,.5*scale,dis);
    
    vec3 disColor=color2-color1;
    
    vec3 color=color1+disColor*scale;

    opacity *= step(dis, .5 * scale);

    opacity -= (scale - 0.8) * 5. * step(0.8, scale);

    
    gl_FragColor=vec4(color,opacity);
}