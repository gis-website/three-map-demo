
varying vec3 vColor;
uniform vec3 upColor;
uniform vec3 upColor2;
uniform float time;
uniform vec3 downColor;
uniform float speed;
uniform float height;
uniform vec3 forceColor;


void main(){
    vec3 targetColor=upColor2-downColor;
    
    float percent=(position.y-height/-2.)/height;
    
    vec3 realUpColor = upColor + targetColor * abs(cos(time));
    vec3 disColor = realUpColor - downColor;
    
    vec3 transformed=position;

    vColor=forceColor;

    if(position.y > height / -2.){
        transformed.y -= cos(time) * speed;
    }
    
     transformed.y = max(transformed.y, height / -2.);

    gl_Position=projectionMatrix*modelViewMatrix*vec4(transformed,1.);
}