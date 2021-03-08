class XYZObserver {
  static add(target, folder, property, options) {
    const subFolder = folder.addFolder(` . ${property}`);

    if (options.open) subFolder.open();

    let min = -3; let max = 3;

    if (property === 'rotation') {
      min = 0; max = Math.PI * 2;
    }

    subFolder.add(target, 'x', min, max, 0.01);
    subFolder.add(target, 'y', min, max, 0.01);
    subFolder.add(target, 'z', min, max, 0.01);
  }
}

export default XYZObserver;
