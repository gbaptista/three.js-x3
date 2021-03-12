import MaterialObserver from './material';
import XYZObserver from '../properties/xyz';

class MeshObserver {
  static add(object, folder, userOptions, state) {
    const options = userOptions || {};

    folder.add(object, 'visible');

    if (object.material) {
      MaterialObserver.add(object.material, folder, options, state);
    }

    if (options.xyz === undefined) {
      options.xyz = ['position', 'rotation', 'scale'];
    }

    XYZObserver.addProperties(object, options.xyz, folder, options);
  }
}

export default MeshObserver;
