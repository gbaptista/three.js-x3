import Helpers from '../../helpers';

class LightProbeObserver {
  static add(object, folder) {
    folder.add(object, 'visible');

    ['intensity', 'angle', 'distance'].forEach((property) => {
      if (object[property]) {
        const range = Helpers.minMaxFor(object[property], property);

        folder.add(object, property, range.min, range.max, range.step);
      }
    });
  }
}

export default LightProbeObserver;
