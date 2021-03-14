const PROPERTIES = {
  aoMapIntensity: { min: 0, max: 1, step: 0.001 },
  bumpScale: { min: 0, max: 1, step: 0.001 },
  clearcoat: { min: 0, max: 1, step: 0.001 },
  clearcoatRoughness: { min: 0, max: 1, step: 0.001 },
  ior: { min: 1.0, max: 2.333, step: 0.001 },
  metalness: { min: 0, max: 1, step: 0.001 },
  opacity: { min: 0, max: 1, step: 0.001 },
  reflectivity: { min: 0, max: 1, step: 0.001 },
  refractionRatio: { min: 0, max: 1, step: 0.001 },
  roughness: { min: 0, max: 1, step: 0.001 },
  shininess: { min: 0, max: 10000, step: 1 },
  transmission: { min: 0, max: 1, step: 0.001 },
};

class Helpers {
  static minMaxFor(currentValue, property) {
    if (PROPERTIES[property]) return PROPERTIES[property];

    let distance = Math.round(Math.abs(currentValue));

    if (distance === 0) distance = 1;

    distance *= 5;

    let min = currentValue - distance;
    let max = currentValue + distance;

    if (['angle', 'fov'].includes(property)) {
      min = currentValue - Math.PI;
      max = currentValue + Math.PI;
    } else if (property === 'intensity') {
      min = 0;
      max = 20;
    }

    const result = { min, max, step: 0.01 };

    return result;
  }
}

export default Helpers;
