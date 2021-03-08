import Stats from 'stats.js';

import OrbitController from './controllers/orbit';
import GUIController from './controllers/gui';

const VERSION = '0.0.1';

class THREEx3 {
  constructor(dependencies, userOptions) {
    this.VERSION = VERSION;

    const options = userOptions || {};

    this.dependencies = dependencies;

    if (options.orbit) this.addOrbit();
    if (options.grid) this.addGrid();
    if (options.axes) this.addAxes();
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

  addGrid(size, divisions) {
    const gridHelper = new this.dependencies.THREE.GridHelper(
      size, divisions,
    );
    this.dependencies.scene.add(gridHelper);
  }

  addAxes(size) {
    const axesHelper = new this.dependencies.THREE.AxesHelper(size);
    this.dependencies.scene.add(axesHelper);
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
