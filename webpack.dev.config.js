const path = require("path");
const webpack = require("webpack");

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
      {
        loader: "babel-loader",
        include: [path.resolve(__dirname, "src")],
        test: /\.js$/,
        query: {
          presets: ['es2017']
        }
      }
    ]
  },
  plugins: []
}