class Helpers {
  static minMaxFor(currentValue, property) {
    let distance = Math.round(Math.abs(currentValue));

    if (distance === 0) distance = 1;

    distance *= 5;

    let min = currentValue - distance;
    let max = currentValue + distance;

    if (property === 'angle') {
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
