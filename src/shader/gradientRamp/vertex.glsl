precision highp float;
varying vec3 vp;
void main() {
    vp = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}