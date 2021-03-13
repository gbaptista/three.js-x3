import Stats from 'stats.js';

import OrbitController from './controllers/orbit';
import GUIController from './controllers/gui';

const VERSION = '0.0.9';

class THREEx3 {
  constructor(dependencies, userOptions) {
    this.VERSION = VERSION;

    const options = userOptions || {};

    this.dependencies = dependencies;

    if (options.orbit === undefined) {
      options.orbit = true;
    }

    if (options.grid === undefined) {
      options.grid = { visible: true };
    }

    if (options.axes === undefined) {
      options.axes = { visible: true };
    }

    if (options.orbit) this.addOrbit();
    if (options.grid) this.addGrid(undefined, undefined, options.grid);
    if (options.axes) this.addAxes(undefined, options.axes);
  }

  setupGUI() {
    this.guiController = new GUIController(
      this.dependencies.THREE,
      this.dependencies.scene,
    );
  }

  addOrbit() {
    this.orbitController = new OrbitController(
      this.dependencies.OrbitControls,
      this.dependencies.camera,
      this.dependencies.renderer,
    );
  }

  add(object, options) {
    if (this.guiController === undefined) this.setupGUI();

    this.guiController.add(object, options);
  }

  addGrid(size, divisions, userOptions) {
    let options = userOptions || {};

    if (options === true) options = {};

    if (options.size === undefined) options.size = size;
    if (options.divisions === undefined) options.divisions = divisions;

    const gridHelper = new this.dependencies.THREE.GridHelper(
      options.size, options.divisions,
    );

    if (options.visible !== undefined) {
      gridHelper.visible = options.visible;
    }

    this.dependencies.scene.add(gridHelper);

    this.add(gridHelper);
  }

  addAxes(userSize, userOptions) {
    let options = userOptions || {};

    if (options === true) options = {};

    if (options.size === undefined) options.size = userSize;
    if (options.size === undefined) options.size = 5;

    const axesHelper = new this.dependencies.THREE.AxesHelper(
      options.size,
    );

    if (options.visible !== undefined) {
      axesHelper.visible = options.visible;
    }

    this.dependencies.scene.add(axesHelper);

    this.add(axesHelper);
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  tick() {
    if (this.orbitController) this.orbitController.tick();
    if (this.guiController) this.guiController.tick();
  }

  fps(ticker) {
    if (this.stats === undefined) this.setupStats();

    this.stats.begin();

    ticker();

    this.stats.end();
  }

  static version() {
    return VERSION;
  }

  version() {
    return this.VERSION;
  }
}

THREEx3.VERSION = VERSION;

export default THREEx3;
