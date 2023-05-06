precision highp float;
varying vec3 v_Position;
void main() {
    v_Position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}