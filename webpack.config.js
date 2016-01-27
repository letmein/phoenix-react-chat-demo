module.exports = {
  entry: "./web/static/js/app.js",
  output: {
    path: "./priv/static/js",
    filename: "app.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel",
      exclude: /node_modules/,
      query: {
        presets: ["react", "es2015", "stage-0"]
      }
    }, {
      test: /\.rt\.jade$/,
      loaders: ["react-templates", "jade-html"]
    }]
  },
  resolve: {
    modulesDirectories: [
      __dirname + "/node_modules",
      __dirname + "/web/static/js"
    ],
    alias: {
      app: __dirname + "/web/static/js",
      phoenix_html: __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
  }
}
