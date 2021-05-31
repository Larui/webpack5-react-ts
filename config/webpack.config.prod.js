const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackBase = require("./webpack.config.base");

module.exports = merge(webpackBase, {
  mode: "production",
  output: {
    // 输出目录
    path: path.resolve(__dirname, "../dist"),
    // 文件名称
    filename: "[name].js",
    chunkFilename: "common.js",
    publicPath: "./",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        exclude: /node_modules/,
      }),
    ],
    splitChunks: {
      //分割代码块多页面应用会用到
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      cacheGroups: {
        common: {
          //公共模块
          chunks: "initial",
          minSize: 0,
          minChunks: 2,
        },
        vendors: {
          //抽离第三方
          test: /[\\/]node_modules[\\/]/, //抽离出来
          priority: 1, //权重
        },
      },
    },
  },
  performance: {
    hints: false,
    // maxEntrypointSize: 400000
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "../dist")],
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    // 忽略moment目录下的locale文件夹
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  ],
});
