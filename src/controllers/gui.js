import * as dat from 'dat.gui';

import XYZObserver from '../observers/xyz';
import ColorObserver from '../observers/color';

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

  static observeXYZ(object, properties, folder, options) {
    properties.forEach((property) => {
      if (object[property]) {
        XYZObserver.add(object[property], folder, property, options);
      }
    });
  }

  static addLightProbe(object, folder) {
    folder.add(object, 'visible');

    ['intensity', 'angle', 'distance'].forEach((property) => {
      if (object[property]) {
        let min = 0; let max = 15;

        if (property === 'angle') {
          min = 0; max = Math.PI * 2;
        }

        folder.add(object, property, min, max, 0.01);
      }
    });
  }

  addLight(object, folder, userOptions) {
    const options = userOptions || {};

    folder.add(object, 'visible');

    ['color', 'groundColor'].forEach((property) => {
      if (object[property]) {
        ColorObserver.add(
          object, folder, property, options, this.state,
        );
      }
    });

    ['intensity', 'angle', 'distance'].forEach((property) => {
      if (object[property]) {
        let min = 0; let max = 15;

        if (property === 'angle') {
          min = 0; max = Math.PI * 2;
        }

        folder.add(object, property, min, max, 0.01);
      }
    });

    if (options.helper === undefined) options.helper = true;

    if (options.helper) {
      let lightHelper;

      switch (object.type) {
        case 'DirectionalLight':
          lightHelper = new this.THREE.DirectionalLightHelper(object, 0.1); break;
        case 'HemisphereLight':
          lightHelper = new this.THREE.HemisphereLightHelper(object, 0.1); break;
        case 'HemisphereLightProbe':
          lightHelper = new this.THREE.HemisphereLightHelper(object, 0.1); break;
        case 'PointLight':
          lightHelper = new this.THREE.PointLightHelper(object, 0.1); break;
        case 'SpotLight':
          lightHelper = new this.THREE.SpotLightHelper(object, 0.1); break;
        default:
          lightHelper = null;
      }

      if (lightHelper !== null) {
        /* eslint-disable no-underscore-dangle, no-param-reassign */
        object.userData.__lightHelper = lightHelper;
        const subFolder = folder.addFolder(' . helper');
        subFolder.add(lightHelper, 'visible');
        if (options.open) subFolder.open();
        /* eslint-enable no-underscore-dangle, no-param-reassign */
        this.scene.add(lightHelper);
      }
    }

    if (options.xyz === undefined) {
      options.xyz = ['position'];
    }

    GUIController.observeXYZ(object, options.xyz, folder, options);
  }

  static addCamera(object, folder, userOptions) {
    const options = userOptions || {};

    if (options.xyz === undefined) {
      options.xyz = ['position'];
    }

    GUIController.observeXYZ(object, options.xyz, folder, options);
  }

  addMesh(object, folder, userOptions) {
    const options = userOptions || {};

    folder.add(object, 'visible');

    if (object.material) {
      folder.add(object.material, 'wireframe');
      ColorObserver.add(
        object.material, folder, 'color', options, this.state,
      );
    }

    if (options.xyz === undefined) {
      options.xyz = ['position', 'rotation', 'scale'];
    }

    GUIController.observeXYZ(object, options.xyz, folder, options);
  }
}

export default GUIController;
