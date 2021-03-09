import ColorObserver from '../properties/color';
import XYZObserver from '../properties/xyz';

class MeshObserver {
  static add(object, folder, userOptions, state) {
    const options = userOptions || {};

    folder.add(object, 'visible');

    if (object.material) {
      const subFolder = folder.addFolder(` . material (${object.material.type})`);

      subFolder.add(object.material, 'wireframe');
      ColorObserver.add(
        object.material, subFolder, 'color', options, state,
      );
    }

    if (options.xyz === undefined) {
      options.xyz = ['position', 'rotation', 'scale'];
    }

    XYZObserver.addProperties(object, options.xyz, folder, options);
  }
}

export default MeshObserver;
