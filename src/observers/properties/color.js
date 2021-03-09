class ColorObserver {
  static add(target, folder, property, options, state) {
    const key = `${target.uuid}.${property}`;

    /* eslint-disable no-param-reassign */
    state[key] = {
      target, colorKey: property,
    };

    state[key][property] = target[property].getHex();
    /* eslint-disable no-param-reassign */

    folder.addColor(state[key], property);
  }
}

export default ColorObserver;
