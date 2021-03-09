/* eslint-disable no-undef */

const options = {
  targetSelector: '#scene',
  width: 800,
  height: 600,
  backgroundColor: 0x222222,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(options.backgroundColor);

const camera = new THREE.PerspectiveCamera(
  75, options.width / options.height,
  0.1, 1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(options.width, options.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;
document.querySelector(options.targetSelector).appendChild(renderer.domElement);

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(),
  new THREE.MeshStandardMaterial({ color: 0xffffff }),
);
cube.position.x = 1;
scene.add(cube);

// const focusLight = new THREE.PointLight(0xfffee3, 10);
const focusLight = new THREE.SpotLight(0xfffee3, 10, 6, 0.4);
focusLight.position.set(1, 3, 1);
focusLight.target = cube;
scene.add(focusLight);

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
// const light = new THREE.HemisphereLightProbe(0xffffbb, 0x080820, 1);
light.position.set(0, 2, 0);
scene.add(light);

// -------------------------------

const x3 = new THREEx3(
  {
    THREE,
    OrbitControls: THREE.OrbitControls,
    camera,
    renderer,
    scene,
  },
);

// x3.add(focusLight, { label: 'Focus Light', open: false });
// x3.add(light, { label: 'World Light', helper: true, open: true });
// x3.add(cube, { label: 'Cube', xyz: ['position'] });
// x3.add(camera);

x3.add(focusLight);
x3.add(light);
x3.add(cube, { label: 'Cube' });
x3.add(camera);

renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01; cube.rotation.y += 0.01;

  x3.tick();

  x3.fps(() => {
    renderer.render(scene, camera);
  });
});

/* eslint-disable no-console */
console.log(
  THREEx3.version(), '|',
  THREEx3.VERSION, '|',
  x3.version(), '|',
  x3.VERSION,
);
