const webpack = require("webpack")
const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const envDefine = {
  "process.env.app_env": JSON.stringify(process.env.NODE_ENV || "development"),
  ...[
    "fr_api_key",
    "fr_auth_domain",
    "fr_database_url",
    "fr_project_id",
    "fr_app_id",
  ].reduce(
    (o, key) => ({
      ...o,
      [`process.env.${key}`]: JSON.stringify(process.env[`npm_config_${key}`]),
    }),
    {},
  ),
}
console.log(envDefine)

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
    new webpack.DefinePlugin(envDefine),
  ],
  devServer: {
    host: "127.0.0.1",
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: true,
  },
}
