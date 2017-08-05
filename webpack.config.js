const path = require("path");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                loader: "babel-loader",

                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, "src"),
                ],

                // Only run `.js` and `.jsx` files through Babel
                test: /\.js$/,

                // Options to configure babel with
                query: {
                    presets: ['es2016'],
                }
            },
        ]
    },
    plugins: [
        new BabiliPlugin({})
    ]
};