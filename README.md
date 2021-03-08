# Three.js x3

An interactive plug-and-play debugger and inspector for the Three.js JavaScript 3D library.

## UDM

```js
yarn add three three-x3

npm install three three-x3
```

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import THREEx3 from 'three-x3';

const x3 = new THREEx3(
  { THREE, OrbitControls, camera, renderer, scene },
  { orbit: true, grid: true, axes: true },
);

x3.add(focusLight, { label: 'Focus Light', open: false });

x3.add(light, { label: 'World Light', open: true });

x3.add(cube, { label: 'Cube' });

x3.add(camera);
```

## Window

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.126.1/build/three.min.js" integrity="sha256-RhW9lLg3YYVh/c3z+9Q8cUD5GFShsH1f7mR0lvCROpk=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/three@0.126.1/examples/js/controls/OrbitControls.js" integrity="sha256-+ncCNttOcMopCUa47Sn26Tg06ZC2SnWoi/XikKAhnSY=" crossorigin="anonymous"></script>
```

```js
const x3 = new THREEx3(
  {
    THREE, OrbitControls: THREE.OrbitControls,
    camera, renderer, scene,
  },
  { orbit: true, grid: true, axes: true },
);

x3.add(focusLight, { label: 'Focus Light', open: false });

x3.add(light, { label: 'World Light', open: true });

x3.add(cube, { label: 'Cube' });

x3.add(camera);
```
