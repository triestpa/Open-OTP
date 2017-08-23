/**
 * Base config loaders to be imported in all builds
 */
const path = require("path");

const urlLoader = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
  }
}


const babelLoader = {
  loader: "babel-loader",
  include: [path.resolve(__dirname, "src")],
  test: /\.js$/,
  query: {
    presets: ['es2017']
  }
}

module.exports = {
  urlLoader,
  babelLoader
}