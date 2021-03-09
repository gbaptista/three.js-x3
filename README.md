# Three.js x3

An interactive plug-and-play debugger and inspector for the Three.js JavaScript 3D library.

- [UMD Setup](#udm-setup)
- [window Setup](#window-setup)
- [Documentation](#documentation)

[![Three.js x3 demonstration](https://raw.githubusercontent.com/gbaptista/three.js-x3/main/images/x3.png)](https://raw.githubusercontent.com/gbaptista/three.js-x3/main/images/x3.png)

- [UMD Setup](#udm-setup)
- [window Setup](#window-setup)
- [Documentation](#documentation)
  - [new](#new)
  - [add](#add)
  - [tick](#tick)
  - [fps](#fps)

## UDM Setup

```bash
yarn add three three-x3

npm install three three-x3
```

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import THREEx3 from 'three-x3';

const x3 = new THREEx3(
  { THREE, OrbitControls, camera, renderer, scene }
);

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
```

## window Setup

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.126.1/build/three.min.js" integrity="sha256-RhW9lLg3YYVh/c3z+9Q8cUD5GFShsH1f7mR0lvCROpk=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/three@0.126.1/examples/js/controls/OrbitControls.js" integrity="sha256-+ncCNttOcMopCUa47Sn26Tg06ZC2SnWoi/XikKAhnSY=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/three-x3@0.0.2/dist/x3-standalone.js" integrity="sha256-0ExWK4qAjoTCSQ2V15Z2tcdiRHexpO8qrOUNCGAWMC0=" crossorigin="anonymous"></script>
```

```js
const x3 = new THREEx3(
  {
    THREE, OrbitControls: THREE.OrbitControls,
    camera, renderer, scene,
  }
);

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
```

## Documentation

- [new](#new)
- [add](#add)
- [tick](#tick)
- [fps](#fps)

### new
```js
const x3 = new THREEx3(
  {
    THREE: THREE, OrbitControls: THREE.OrbitControls,
    camera: camera, renderer: renderer, scene: scene,
  },
  options
);
```

`options` parameter for `new THREEx3`:

| Property  | Possible Values | Info |
| ------------- | ------------- | ------------- |
| `orbit`  | `true` `false` | [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) |
| `grid`  | `true` `false`  `{ visible: true, size: 10, divisions: 10 }` `{ visible: false }` | [GridHelper](https://threejs.org/docs/#api/en/helpers/GridHelper) |
| `axes`  | `true` `false`  `{ visible: true, size: 5 }` `{ visible: false }` | [AxesHelper](https://threejs.org/docs/#api/en/helpers/AxesHelper) |

### add

Add a [controller](https://github.com/dataarts/dat.gui) for the object:

```js
x3.add(light, options);
x3.add(cube, options);
x3.add(camera, options);
```

`options` parameter for `add`:

| Property  | Possible Values | Info |
| ------------- | ------------- | ------------- |
| `label`  | `'Some Label'` | Label for the folder. |
| `helper`  | `true` `false`  `{ visible: true }` `{ visible: false }` | Helper for lights. e.g. [PointLightHelper](https://threejs.org/docs/#api/en/helpers/PointLightHelper) |
| `open`  | `true` `false` | Tells whether the folder should be closed or open. |
| `xyz` | `['position', 'rotation', 'scale']` | An array with the properties to show `.x .y .z` controls. |

### tick

Must run inside `setAnimationLoop`:

```js
renderer.setAnimationLoop(() => {
  x3.tick();
  
  renderer.render(scene, camera);
});
```

### fps

Displays a [Performance Monitor](https://github.com/mrdoob/stats.js) with FPS (frames per second):

```js
renderer.setAnimationLoop(() => {
  x3.tick();
  
  x3.fps(() => {
    renderer.render(scene, camera);
  });
});
```
