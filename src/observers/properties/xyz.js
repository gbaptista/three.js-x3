import Helpers from '../../helpers';

class XYZObserver {
  static add(target, folder, property, options) {
    const subFolder = folder.addFolder(` . ${property}`);

    if (options.open) subFolder.open();

    const xRange = Helpers.minMaxFor(target.x);
    const yRange = Helpers.minMaxFor(target.y);
    const zRange = Helpers.minMaxFor(target.z);

    subFolder.add(target, 'x', xRange.min, xRange.max, xRange.step);
    subFolder.add(target, 'y', yRange.min, yRange.max, yRange.step);
    subFolder.add(target, 'z', zRange.min, zRange.max, zRange.step);
  }

  static addProperties(object, properties, folder, options) {
    properties.forEach((property) => {
      if (object[property]) {
        XYZObserver.add(object[property], folder, property, options);
      }
    });
  }
}

export default XYZObserver;
