import XYZObserver from '../properties/xyz';

class CameraObserver {
  static add(object, folder, userOptions) {
    const options = userOptions || {};

    if (options.open === undefined) options.open = true;

    if (options.xyz === undefined) {
      options.xyz = ['position'];
    }

    if (options.open) folder.open();

    XYZObserver.addProperties(object, options.xyz, folder, options);
  }
}

export default CameraObserver;
