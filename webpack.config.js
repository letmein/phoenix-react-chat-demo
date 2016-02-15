module.exports = {
  entry: "./web/static/js/app.js",
  output: {
    path: "./priv/static/js",
    filename: "app.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel",
      exclude: /node_modules/,
      query: {
        presets: ["react", "es2015", "stage-0"]
      }
    }, {
      test: /\.css$/,
      loaders: ["style", "css", "resolve-url"]
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "resolve-url", "sass"]
    }, {
      test: /\.png$/,
      loader: "url?limit=100000"
    }, {
      test: /\.jpg$/,
      loader: "file-loader"
    }]
  },
  resolve: {
    modulesDirectories: [
      __dirname + "/bower_components",
      __dirname + "/node_modules",
      __dirname + "/web/static/js",
      __dirname + "/web/static/assets"
    ],
    alias: {
      app: __dirname + "/web/static/js",
      phoenix_html: __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
  }
}
