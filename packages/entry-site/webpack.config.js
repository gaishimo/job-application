const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")

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
  ],
  devServer: {
    host: "127.0.0.1",
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "public"),
  },
}
