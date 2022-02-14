
// * 准确程度， 中等
precision mediump float;

uniform vec3 uColor;
// * vRandom from vertex, vary the data from vertex to fragment
// varying float vRandom;
// * type for the texture
uniform sampler2D uTexture;
varying vec2 vUv;
varying float vElevation;

void main()
{   
    // * get the pixel color from texture2D
    vec4 textureColor = texture2D(uTexture,vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.6;
    // gl_FragColor = vec4(vRandom, 0.3, vRandom, 1.0);
    gl_FragColor = textureColor;

}