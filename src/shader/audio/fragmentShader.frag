// based on https://www.shadertoy.com/view/lsf3RH by
// trisomie21 (THANKS!)
// My apologies for the ugly code.
#ifdef GL_ES
precision mediump float;
#endif
uniform vec3 iResolution;// viewport resolution (in pixels)
uniform float iTime;// shader playback time (in seconds)
varying vec2 vUv;
uniform sampler2D iChannel0;// input channel. XX = 2D/Cube
uniform sampler2D iChannel1;// input channel. XX = 2D/Cube

float snoise(vec3 uv,float res)// by trisomie21
{
    const vec3 s=vec3(1e0,1e2,1e4);
    
    uv*=res;
    
    vec3 uv0=floor(mod(uv,res))*s;
    vec3 uv1=floor(mod(uv+vec3(1.),res))*s;
    
    vec3 f=fract(uv);f=f*f*(3.-2.*f);
    
    vec4 v=vec4(uv0.x+uv0.y+uv0.z,uv1.x+uv0.y+uv0.z,
    uv0.x+uv1.y+uv0.z,uv1.x+uv1.y+uv0.z);
    
    vec4 r=fract(sin(v*1e-3)*1e5);
    float r0=mix(mix(r.x,r.y,f.x),mix(r.z,r.w,f.x),f.y);
    
    r=fract(sin((v+uv1.z-uv0.z)*1e-3)*1e5);
    float r1=mix(mix(r.x,r.y,f.x),mix(r.z,r.w,f.x),f.y);
    
    return mix(r0,r1,f.z)*2.-1.;
}

float freqs[4];

void main()
{
    freqs[0]=texture(iChannel1,vec2(.01,.25)).x;
    freqs[1]=texture(iChannel1,vec2(.07,.25)).x;
    freqs[2]=texture(iChannel1,vec2(.15,.25)).x;
    freqs[3]=texture(iChannel1,vec2(.30,.25)).x;
    
    float brightness=freqs[1]*.25+freqs[2]*.25;
    float radius=.24+brightness*.2;
    float invRadius=1./radius;
    
    vec3 orange=vec3(.8,.65,.3);
    vec3 orangeRed=vec3(.8,.35,.1);
    float time=iTime*.1;
    float aspect=1.;
    // vec2 uv=gl_FragCoord.xy/iResolution.xy;
    vec2 uv=vUv;
    vec2 p=-.5+uv;
    p.x*=aspect;
    
    float fade=pow(length(2.*p),.5);
    float fVal1=1.-fade;
    float fVal2=1.-fade;
    
    float angle=atan(p.x,p.y)/6.2832;
    float dist=length(p);
    vec3 coord=vec3(angle,dist,time*.1);
    
    float newTime1=abs(snoise(coord+vec3(0.,-time*(.35+brightness*.001),time*.015),15.));
    float newTime2=abs(snoise(coord+vec3(0.,-time*(.15+brightness*.001),time*.015),45.));
    for(int i=1;i<=7;i++){
        float power=pow(2.,float(i+1));
        fVal1+=(.5/power)*snoise(coord+vec3(0.,-time,time*.2),(power*(10.)*(newTime1+1.)));
        fVal2+=(.5/power)*snoise(coord+vec3(0.,-time,time*.2),(power*(25.)*(newTime2+1.)));
    }
    
    float corona=pow(fVal1*max(1.1-fade,0.),2.)*50.;
    corona+=pow(fVal2*max(1.1-fade,0.),2.)*50.;
    corona*=1.2-newTime1;
    vec3 sphereNormal=vec3(0.,0.,1.);
    vec3 dir=vec3(0.);
    vec3 center=vec3(.5,.5,1.);
    vec3 starSphere=vec3(0.);
    
    vec2 sp=-1.+2.*uv;
    sp.x*=aspect;
    sp*=(2.-brightness);
    float r=dot(sp,sp);
    float f=(1.-sqrt(abs(1.-r)))/(r)+brightness*.5;
    if(dist<radius){
        corona*=pow(dist*invRadius,24.);
        vec2 newUv;
        newUv.x=sp.x*f;
        newUv.y=sp.y*f;
        newUv+=vec2(time,0.);
        
        vec3 texSample=texture(iChannel0,newUv).rgb;
        float uOff=(texSample.g*brightness*4.5+time);
        vec2 starUV=newUv+vec2(uOff,0.);
        starSphere=texture(iChannel0,starUV).rgb;
    }
    
    float starGlow=min(max(1.-dist*(1.-brightness),0.),1.);
    //gl_FragColor.rgb	= vec3( r );
    gl_FragColor.rgb=vec3(f*(.75+brightness*.3)*orange)+starSphere+corona*orange+starGlow*orangeRed;
    gl_FragColor.a=1.;
}

