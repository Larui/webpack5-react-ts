const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const Happypack = require("happypack");
const os = require("os");
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length });

const devMode = process.env.NODE_ENV !== "production";

//3927
const webpackConfig = {
  entry: {
    reacthotloader: "react-hot-loader/patch",
    index: "./src/index.tsx",
    dependencies: "./config/dependencies.js",
    sign: "./src/sign.tsx",
  },
  output: {
    filename: "[name].[hash:5].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "[chunkhash].chunk.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".less", ".json"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
        exclude: path.resolve(__dirname, "../public"),
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          {
            loader: "postcss-loader",
          },
          "less-loader",
        ],
        include: path.resolve(__dirname, "../src"),
      },
      {
        test: /\.(js|tsx|ts)$/,
        use: [
          {
            loader: "react-hot-loader/webpack",
          },
          "happypack/loader?id=babel",
          //   "async-catch-loader",
        ],
        include: path.resolve(__dirname, "../src"),
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 81920,
              name: "[name].[hash:5].[ext]",
              outputPath: "static/",
            },
          },
        ],
        include: path.resolve(__dirname, "../src"),
      },
      {
        test: () => true,
        issuer: path.resolve(__dirname, "./dependencies.js"),
        use: [
          {
            loader: "file-loader",
            options: {
              context: path.resolve(__dirname, ".."),
              name: "[path][name].[ext]?version=[hash:8]",
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
    redux: "Redux",
    "react-redux": "ReactRedux",
    antd: "antd",
    moment: "moment",
    lodash: "_",
    "@convertlab/c-design": "cdesign",
    "@convertlab/uilib": "CL_uilib",
    "@convertlab/ui-common": "CL_uicommon",
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: "[path][name][ext]",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
      title: "????????????",
      //   favicon: "favicon.ico",
      inject: true,
      hash: true,
      chunks: ["index"],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "sign.html",
      title: "??????????????????",
      //   favicon: "favicon.ico",
      inject: true,
      hash: true,
      chunks: ["sign"],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    new Happypack({
      //???id????????? happypack?????????????????????
      id: "babel",
      //????????????  ?????????loader ???????????????
      loaders: [
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: devMode,
          },
        },
      ],
      //???????????????threadPool: HappyThreadPool ????????????????????????????????? HappyPack ??????????????????????????????????????????????????????????????????????????????????????????????????????
      threadPool: happyThreadPool,
      //?????? HappyPack ????????????
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      //   filename: devMode ? "[name].css" : "[name].[hash:5].css",
      //   chunkFilename: devMode ? "[id].css" : "[id].[chunkhash].css",
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};

module.exports = webpackConfig;
