const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const postcssPresetEnv = require("postcss-preset-env");

// const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// 试一下chunkhash 来自不同的入口文件

module.exports = {
  entry: "./src/index.js",

  mode: "development",

  output: {
    filename: "index.js",
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
          {
            loader: "eslint-loader",
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     { loader: "css-loader", options: { importLoaders: 1 } },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         ident: "postcss",
      //         plugins: () => [
      //           postcssPresetEnv({ browsers: "last 2 versions" }),
      //         ],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssPresetEnv({ browsers: "last 2 versions" }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 1 * 1024,
          name: "[hash:10].[ext]",
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
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new OptimizeCSSAssetsPlugin(),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
};
