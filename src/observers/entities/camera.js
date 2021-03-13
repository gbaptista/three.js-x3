import Helpers from '../../helpers';
import XYZObserver from '../properties/xyz';

class CameraObserver {
  static add(object, folder, userOptions) {
    const options = userOptions || {};

    if (options.open === undefined) options.open = true;

    if (options.open) folder.open();

    if (options.xyz === undefined) {
      options.xyz = ['position'];
    }

    XYZObserver.addProperties(object, options.xyz, folder, options);

    const subFolder = folder.addFolder(` advanced (${object.type})`);

    [
      'fov',
      'zoom',
    ].forEach((property) => {
      if (
        object[property] !== undefined
        && object[property] !== null
      ) {
        const range = Helpers.minMaxFor(
          object[property], property,
        );

        folder.add(
          object, property,
          range.min, range.max, range.step,
        ).onChange(() => {
          object.updateProjectionMatrix();
        });
      }
    });

    [
      'far',
      'filmGauge',
      'filmOffset',
      'focus',
      'near',
    ].forEach((property) => {
      if (
        object[property] !== undefined
        && object[property] !== null
      ) {
        const range = Helpers.minMaxFor(
          object[property], property,
        );

        subFolder.add(
          object, property,
          range.min, range.max, range.step,
        ).onChange(() => {
          object.updateProjectionMatrix();
        });
      }
    });
  }
}

export default CameraObserver;
