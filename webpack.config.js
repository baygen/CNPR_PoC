const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require('webpack')

module.exports = {
  entry: [
    './client/app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader"
      //     }
      //   ]
      // }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    // poll: 1000,
    ignored: ['node_modules', 'dist', 'server', 'Docs']
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: "./client/index.html",
  //     filename: "./index.html"
  //   })
  // ]
};