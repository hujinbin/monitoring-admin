'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader')

// const ElementPlus = require("unplugin-element-plus/webpack").default;

// const ESLintPlugin = require('eslint-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// const createLintingRule = () => ({
//   test: /\.(js|vue)$/,
//   loader: 'eslint-loader',
//   enforce: 'pre',
//   include: [resolve('src'), resolve('test')],
//   options: {
//     formatter: require('eslint-friendly-formatter'),
//     emitWarning: !config.dev.showEslintErrorsInOverlay
//   }
// })

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/main.ts",
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/,
        options: Object.assign(vueLoaderConfig, {
          loaders: {
            ts: "ts-loader",
            tsx: "babel-loader!ts-loader",
          },
        }),
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: { appendTsxSuffixTo: [/\.vue$/] },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("img/[name].[contenthash].[ext]"),
        },
        // loader: 'url-loader',
        // options: {
        //   limit: 10000,
        //   name: utils.assetsPath('img/[name].[contenthash:7].[ext]')
        // }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("media/[name].[contenthash].[ext]"),
        },
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-sprite-loader',
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("fonts/[name].[contenthash].[ext]"),
        },
      },
    ],
  },
  plugins: [
    //   new ESLintPlugin({
    //     formatter: require('eslint-friendly-formatter'),
    //     emitWarning: !config.dev.showEslintErrorsInOverlay
    //   })
    new VueLoaderPlugin(),
    // ElementPlus(),
  ],
  optimization: {
    chunkIds: "named",
    moduleIds: "named",
    mangleExports: "deterministic",
  },
  target: ["web", "es5"],
  // node: {
  //   // prevent webpack from injecting useless setImmediate polyfill because Vue
  //   // source contains it (although only uses it if it's native).
  //   setImmediate: false,
  //   // prevent webpack from injecting mocks to Node native modules
  //   // that does not make sense for the client
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty'
  // }
};
