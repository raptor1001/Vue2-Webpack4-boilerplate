"use strict";

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const helpers = require("./helpers");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const webpackConfig = {
  entry: {
    polyfill: "@babel/polyfill",
    main: helpers.root("src", "main"),
  },
  resolve: {
    extensions: ["*", ".js", ".vue"],
    alias: {
      vue$: isDev ? "vue/dist/vue.runtime.js" : "vue/dist/vue.runtime.min.js",
      "@": helpers.root("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        include: [helpers.root("src")],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [helpers.root("src")],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: helpers.root("src", "static"),
          to: "./",
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlPlugin({ template: "index.html" }),
  ],
};

module.exports = webpackConfig;
