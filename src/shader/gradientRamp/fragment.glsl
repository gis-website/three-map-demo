varying vec3 vp;
uniform vec3 u_color;
void main() {
    gl_FragColor = vec4(u_color, 1.0 - (1.0 - vp.z) * (1.0 - vp.z));
}