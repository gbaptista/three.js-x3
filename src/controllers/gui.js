import * as dat from 'dat.gui';

import CameraObserver from '../observers/entities/camera';
import GenericObserver from '../observers/entities/generic';
import LightObserver from '../observers/entities/light';
import LightProbeObserver from '../observers/entities/light_probe';
import MeshObserver from '../observers/entities/mesh';

class GUIController {
  constructor(THREE, scene) {
    this.controls = new dat.GUI({ name: 'Three.js Debugger' });
    this.state = {};
    this.scene = scene;
    this.THREE = THREE;
  }

  tick() {
    this.controls.updateDisplay();
    this.updateColors();
  }

  updateColors() {
    Object.keys(this.state).forEach((key) => {
      const { target } = this.state[key];
      const property = this.state[key].colorKey;
      target[property] = new this.THREE.Color(
        this.state[key][property],
      );

      /* eslint-disable no-underscore-dangle */
      if (target.userData.__lightHelper) {
        target.userData.__lightHelper[property] = new this.THREE.Color(
          this.state[key][property],
        );

        target.userData.__lightHelper.update();
      }
      /* eslint-enable no-underscore-dangle */
    });
  }

  add(object, userOptions) {
    const options = userOptions || {};

    if (options.label === undefined) {
      options.label = object.type;
    } else {
      options.label = `${options.label} (${object.type})`;
    }

    const mainFolder = this.controls.addFolder(options.label);

    if (options.open) mainFolder.open();

    let strategy;

    switch (object.type) {
      case 'Mesh': strategy = 'addMesh'; break;

      case 'GridHelper': strategy = 'addGenericHelper'; break;
      case 'AxesHelper': strategy = 'addGenericHelper'; break;

      case 'Camera': strategy = 'addCamera'; break;
      case 'CubeCamera': strategy = 'addCamera'; break;
      case 'OrthographicCamera': strategy = 'addCamera'; break;
      case 'PerspectiveCamera': strategy = 'addCamera'; break;
      case 'StereoCamera': strategy = 'addCamera'; break;

      case 'AmbientLightProbe': strategy = 'addLightProbe'; break;
      case 'HemisphereLightProbe': strategy = 'addLightProbe'; break;
      case 'LightProbe': strategy = 'addLightProbe'; break;

      case 'AmbientLight': strategy = 'addLight'; break;
      case 'DirectionalLight': strategy = 'addLight'; break;
      case 'HemisphereLight': strategy = 'addLight'; break;
      case 'Light': strategy = 'addLight'; break;
      case 'PointLight': strategy = 'addLight'; break;
      case 'RectAreaLight': strategy = 'addLight'; break;
      case 'SpotLight': strategy = 'addLight'; break;

      default:
        /* eslint-disable no-console */
        console.error(`Missing strategy for ${object.type}.`);
        /* eslint-enable no-console */
    }

    if (strategy === 'addLight' && object.sh !== undefined) {
      strategy = 'addLightProbe';
    }

    if (strategy !== undefined) {
      if (this[strategy] === undefined) {
        GUIController[strategy](object, mainFolder, options);
      } else {
        this[strategy](object, mainFolder, options);
      }
    }
  }

  static addGenericHelper(object, folder) {
    GenericObserver.add(object, folder);
  }

  static addLightProbe(object, folder) {
    LightProbeObserver.add(object, folder);
  }

  static addCamera(object, folder, userOptions) {
    CameraObserver.add(object, folder, userOptions);
  }

  addLight(object, folder, userOptions) {
    LightObserver.add(
      object, folder, userOptions,
      this.state, this.THREE, this.scene,
    );
  }

  addMesh(object, folder, userOptions) {
    MeshObserver.add(object, folder, userOptions, this.state);
  }
}

export default GUIController;
