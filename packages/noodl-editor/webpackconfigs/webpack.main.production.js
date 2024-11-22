const path = require('path');
const merge = require('webpack-merge').default;
const shared = require('./shared/webpack.shared.js');
const getExternalModules = require('./helpers/get-externals-modules');

module.exports = merge(shared, {
  mode: 'production',
  target: 'electron-main',
  externals: getExternalModules({
    production: true
  }),
  entry: {
    'main': './src/main/main.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  }
});
