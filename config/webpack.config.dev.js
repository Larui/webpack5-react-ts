const path = require("path");
const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.config.base");
const webpack = require("webpack");
const { TARGET } = require("./config");

module.exports = merge(webpackBase, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 3010,
    host: "localhost",
    compress: true,
    inline: true,
    hot: true,
    contentBase: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
    hotOnly: true, //即使HMR没有生效 浏览器也不会自动更新 必须设置
    open: true,
    stats: "errors-only",

    proxy: {
      "/api": {
        target: TARGET,
        pathRewrite: {
          "/api": "/api",
        },
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimization: {
    moduleIds: "named",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"',
      },
    }),
  ],
});
