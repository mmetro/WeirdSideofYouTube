module.exports = {
  entry: ['whatwg-fetch', './frontend/videos.js'],
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
