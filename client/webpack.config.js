const path = require('path')

config = {
  entry: "./public/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'build/')
  },
  devtool: 'source-map'
};

module.exports = config;
