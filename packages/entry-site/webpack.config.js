const webpack = require("webpack")
const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const envDefinition = {
  "process.env.app_env": JSON.stringify(process.env.NODE_ENV || "development"),
  ...["api_url_add_job_entry"].reduce(
    (o, key) => ({
      ...o,
      [`process.env.${key}`]: JSON.stringify(process.env[`npm_config_${key}`]),
    }),
    {},
  ),
}
console.log(envDefinition)

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
    new webpack.DefinePlugin(envDefinition),
  ],
  devServer: {
    host: "127.0.0.1",
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "public"),
  },
}
