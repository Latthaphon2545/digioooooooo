const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.join(__dirname, 'src', 'index.ts'),
  node: {
    __dirname: true
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '..', '..', 'node_modules'),
      allowlist: ['@planetx/helpers', '@planetx/models']
    })
  ],
  externalsPresets: {
    node: true
  },
  optimization: {
    minimize: false,
    nodeEnv: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.ts']
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  }
}
