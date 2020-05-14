const webpack = require("webpack")
const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
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
    new CopyPlugin([
      {
        from: "public/*.css",
        to: ".",
        flatten: true,
      },
    ]),
    new webpack.DefinePlugin({
      "process.env.APP_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      ...[
        "FIREBASE_API_KEY",
        "FIREBASE_AUTH_DOMAIN",
        "FIREBASE_DATABASE_URL",
        "FIREBASE_PROJECT_ID",
        "FIREBASE_APP_ID",
      ].reduce(
        (o, key) => ({
          ...o,
          [`process.env.${key}`]: JSON.stringify(process.env[key]),
        }),
        {},
      ),
    }),
  ],
  devServer: {
    host: "127.0.0.1",
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: true,
  },
}
