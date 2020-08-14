const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const postcssPresetEnv = require("postcss-preset-env");

// const TerserJSPlugin = require("terser-webpack-plugin");
// 提取css代码
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css代码
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 试一下chunkhash 来自不同的入口文件

module.exports = {
  entry: {
    index: "./src/index.js",
  },

  mode: "development",

  output: {
    filename: "js/[contenthash:10].js",
    path: path.resolve(__dirname, "dist"),
  },

  // optimization: {
  //   minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 1 * 1024,
          name: "image/[hash:10].[ext]",
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(jpg|png|gif|html|js|css|less)$/,
        loader: "file-loader",
        options: {
          outputPath: "static",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new OptimizeCSSAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[contenthash:10].css",
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: true,
  },
  devtool: "cheap-module-source-map",
};
