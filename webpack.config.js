const path = require('path');

module.exports = (env) => {
  let userEnv = 'development';

  if (env.NODE_ENV !== undefined) {
    userEnv = env.NODE_ENV;
  }

  let target = 'window'; // window umd

  if (env.BUILD_TARGET !== undefined) {
    target = env.BUILD_TARGET;
  }

  if (target === 'umd') {
    return {
      mode: userEnv,
      entry: './src/x3.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'x3.js',
        library: 'THREEx3',
        libraryTarget: 'umd',
      },
    };
  } if (target === 'window') {
    return {
      mode: userEnv,
      entry: './src/x3-standalone.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'x3-standalone.js',
        libraryTarget: 'window',
      },
    };
  }
};
