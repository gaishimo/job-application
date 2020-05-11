const webpack = require("webpack")
const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
require("dotenv").config()

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ["babel-loader", "ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.APP_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      "process.env.API_URL_ADD_JOB_ENTRY": JSON.stringify(
        process.env.API_URL_ADD_JOB_ENTRY,
      ),
    }),
  ],
  devServer: {
    host: "127.0.0.1",
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "public"),
  },
}
