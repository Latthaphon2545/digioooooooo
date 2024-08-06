const nodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: true
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '..', '..', 'node_modules')
    })
  ],
  externalsPresets: {
    node: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    nodeEnv: false
  }
}
