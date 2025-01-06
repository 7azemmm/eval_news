const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');


module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    
    publicPath: '/'  // Ensure service worker script is served under /views/
    
  },
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  
  devServer: {
    port: 3000,
    allowedHosts: "all",
    proxy: [
      {
        context: ["/api"], // Proxy requests starting with /api
        target: "http://localhost:8000", // Backend server
        changeOrigin: true,
      },
    ],
  },
  
  
};