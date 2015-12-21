var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  context: __dirname + "/app",

  entry: {
    javascript: './app.js',
    html: './index.html',
    css: './fauxChart.css'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: 
          {
            presets: ['es2015', 'react']
          }
      },

      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ],
  },

  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },

  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}