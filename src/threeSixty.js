import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Test cube
 */
let picLists = ["px", "nx", "py", "ny", "pz", "nz"];
const textureLoader = new THREE.TextureLoader();
let boxMaterials = [];
picLists.forEach((item) => {
  let texture = textureLoader.load(
    `/textures/environmentMaps/10/${item}.png`
  );
  texture.generateMipmaps = false;
  texture.minFilter = THREE.NearestFilter;
  boxMaterials.push(
    new THREE.MeshBasicMaterial({ map: texture })
  );
});

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, -10),
  boxMaterials
);
// scene.add(cube);

/**
 * test sphere
 **/
const sphereTexture = textureLoader.load(
  "/textures/environmentMaps/10/test3.png"
);
sphereTexture.generateMipmaps = false;
sphereTexture.minFilter = THREE.NearestFilter;
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: sphereTexture,
});
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);

const sphere = new THREE.Mesh(
  sphereGeometry,
  sphereMaterial
);

sphereGeometry.scale(16, 16, -16);
scene.add(sphere);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
