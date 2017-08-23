const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./webpack.base")

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
          }
        }
      },
      baseConfig.urlLoader,
      baseConfig.babelLoader
    ]
  },
  plugins: []
}