varying vec3 vp;
uniform vec3 u_color;
uniform vec3 u_tcolor;
uniform float u_r;
uniform float u_length;
float getRadius(float x, float y) {
    return sqrt((x - 0.0) * (x - 0.0) + (y - 0.0) * (y - 0.0));
}
void main() {
    float uOpacity = 0.3;
    vec3 vColor = u_color;
    float uLength = getRadius(vp.x, vp.y);
    if(uLength <= u_r && uLength > u_r - u_length) {
        float op = sin((u_r - uLength) / u_length) * 0.6 + 0.3;
        uOpacity = op;
        if(vp.y < 0.0) {
            vColor = u_tcolor * 0.6;
        } else {
            vColor = u_tcolor;
        };
    }
    gl_FragColor = vec4(vColor, uOpacity);
}