import Helpers from '../../helpers';

import ColorObserver from '../properties/color';
import XYZObserver from '../properties/xyz';

class LightObserver {
  static add(object, folder, userOptions, state, THREE, scene) {
    const options = userOptions || {};

    folder.add(object, 'visible');

    ['color', 'groundColor'].forEach((property) => {
      if (object[property]) {
        ColorObserver.add(
          object, folder, property, options, state,
        );
      }
    });

    ['intensity', 'angle', 'distance'].forEach((property) => {
      if (object[property]) {
        const range = Helpers.minMaxFor(object[property], property);

        folder.add(object, property, range.min, range.max, range.step);
      }
    });

    if (options.helper === undefined) options.helper = true;

    if (options.helper) {
      let lightHelper;

      let helperType = '';

      switch (object.type) {
        case 'DirectionalLight':
          lightHelper = new THREE.DirectionalLightHelper(object, 0.2);
          helperType = 'DirectionalLightHelper'; break;
        case 'HemisphereLight':
          lightHelper = new THREE.HemisphereLightHelper(object, 0.2);
          helperType = 'HemisphereLightHelper'; break;
        case 'HemisphereLightProbe':
          lightHelper = new THREE.HemisphereLightHelper(object, 0.2);
          helperType = 'HemisphereLightHelper'; break;
        case 'PointLight':
          lightHelper = new THREE.PointLightHelper(object, 0.2);
          helperType = 'PointLightHelper'; break;
        case 'SpotLight':
          lightHelper = new THREE.SpotLightHelper(object, 0.2);
          helperType = 'SpotLightHelper'; break;
        default:
          lightHelper = null;
      }

      if (lightHelper !== null) {
        /* eslint-disable no-underscore-dangle, no-param-reassign */
        object.userData.__lightHelper = lightHelper;
        const subFolder = folder.addFolder(` . ${helperType}`);
        subFolder.add(lightHelper, 'visible');
        if (options.open) subFolder.open();

        if (options.helper.visible !== undefined) {
          lightHelper.visible = options.helper.visible;
        }

        /* eslint-enable no-underscore-dangle, no-param-reassign */
        scene.add(lightHelper);
      }
    }

    if (options.xyz === undefined) {
      options.xyz = ['position'];
    }

    XYZObserver.addProperties(object, options.xyz, folder, options);
  }
}

export default LightObserver;
