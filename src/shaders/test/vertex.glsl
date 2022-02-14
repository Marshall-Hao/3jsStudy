uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
// * 可以将js中的uniform的值传到glsl，就可以动态改变了
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;
// varying float vRandom;

void main()
{   
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
    // modelPosition.z += aRandom * 0.1;
    modelPosition.z += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
}