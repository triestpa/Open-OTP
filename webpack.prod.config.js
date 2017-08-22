const path = require("path");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");

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
            'scss': 'vue-style-loader!css-loader?minimize&{discardComments:{removeAll:true}}!sass-loader',
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
  plugins: [
    new BabiliPlugin({}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}