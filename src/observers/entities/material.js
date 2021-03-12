import ColorObserver from '../properties/color';
import Helpers from '../../helpers';

class MaterialObserver {
  static add(object, folder, userOptions, state) {
    const options = userOptions || {};

    const subFolder = folder.addFolder(` . material (${object.type})`);
    if (options.open) subFolder.open();

    [
      'wireframe',
    ].forEach((property) => {
      if (object[property] !== undefined) {
        subFolder.add(object, property);
      }
    });

    [
      'color',
    ].forEach((property) => {
      if (object[property] !== undefined) {
        ColorObserver.add(
          object, subFolder, property, options, state,
        );
      }
    });

    [
      ['metalness'],
      ['reflectivity'],
      ['roughness'],
      ['shininess'],
      ['transmission'],
    ].forEach((property) => {
      if (
        property[1] === undefined
          || (
            object[property[1]] !== undefined
            && object[property[1]] !== null
          )
      ) {
        if (object[property[0]] !== undefined) {
          const range = Helpers.minMaxFor(
            object[property[0]], property[0],
          );

          subFolder.add(
            object, property[0],
            range.min, range.max, range.step,
          );
        }
      }
    });

    MaterialObserver.addAdvanced(object, subFolder, options, state);
  }

  static addAdvanced(object, folder, userOptions, state) {
    const options = userOptions || {};

    const subFolder = folder.addFolder(` advanced (${object.type})`);

    [
      'flatShading',
      'fog',
      'morphNormals',
      'morphTargets',
      'skinning',
      'transparent',
    ].forEach((property) => {
      if (object[property] !== undefined) {
        subFolder.add(object, property);
      }
    });

    [
      'emissive',
      'sheen',
      'specular',
    ].forEach((property) => {
      if (object[property] !== undefined) {
        ColorObserver.add(
          object, subFolder, property, options, state,
        );
      }
    });

    [
      ['aoMapIntensity', 'aoMap'],
      ['bumpScale', 'bumpMap'],
      ['clearcoat'],
      ['clearcoatRoughness'],
      ['combine'],
      ['displacementBias', 'displacementMap'],
      ['displacementScale', 'displacementMap'],
      ['emissiveIntensity'],
      ['envMapIntensity', 'envMap'],
      ['farDistance'],
      ['ior'],
      ['lightMapIntensity', 'lightMap'],
      ['nearDistance'],
      ['opacity'],
      ['refractionRatio'],
    ].forEach((property) => {
      if (
        property[1] === undefined
          || (
            object[property[1]] !== undefined
            && object[property[1]] !== null
          )
      ) {
        if (object[property[0]] !== undefined) {
          const range = Helpers.minMaxFor(
            object[property[0]], property[0],
          );

          subFolder.add(
            object, property[0],
            range.min, range.max, range.step,
          );
        }
      }
    });
  }
}

export default MaterialObserver;
