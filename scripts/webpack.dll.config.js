const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const TerserPlugin = require("terser-webpack-plugin")

const __DEV__ = process.env.NODE_ENV !== 'production'

// split your chunks
const vendors = [
  'whatwg-fetch',
  'sweetalert',
  'fingerprintjs2',
  'js-sha256',
  'intersection-observer',
  '@ungap/url-search-params',
  'redux',
  'mixpanel-browser',
]

const reacts = [
  'react',
  '@reach/router',
  'react-dom',
  'react-transition-group',
  'react-redux',
  'redux-saga',
  '@nearform/react-animation',
  'react-table',
  '@apollo/client',
  '@sentry/react',
  'recharts'
]

const distDirname = 'dist' + (__DEV__ ? '-dev' : '')

const config = {
  output: {
    path: path.resolve(__dirname, '..', distDirname),
    filename: `[name]_[${__DEV__ ? 'id' : 'contenthash'}].dll.js`,
    library: '[name]'
  },
  entry: {
    vendor: vendors,
    reacts
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // devtool: process.env.NODE_ENV !== 'production' ? '#source-map' : false,
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '..', distDirname, '[name]-manifest.json'),
      name: '[name]',
      context: __dirname,
      entryOnly: false
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } })
  )
  config.optimization = {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015'
      }),
      // new TerserPlugin(),
    ]
  }
}

module.exports = config
