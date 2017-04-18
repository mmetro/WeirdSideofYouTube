module.exports = {
  entry: {
    videos: ['whatwg-fetch', './frontend/videos.js'],
    admin: ['whatwg-fetch', './frontend/admin.js']
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
        { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
