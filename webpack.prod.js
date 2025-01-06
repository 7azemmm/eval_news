const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"), 
    filename: "bundle.js",
  },
  mode: "production",
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
    new CleanWebpackPlugin(), // Clean dist folder before each build
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === "image",
          handler: "CacheFirst",
          options: {
            cacheName: "image-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            },
          },
        },
        {
          urlPattern: ({ request }) =>
            request.destination === "script" || request.destination === "style",
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "asset-cache",
          },
        },
      ],
    }),
  ],
  devServer: {
    port: 8000,
    allowedHosts: "all",
  },
};
