import { dirname } from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";
import { VueLoaderPlugin } from "vue-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mode = "development";
let target = "web";

const isProd = process.env.NODE_ENV === "production";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

const config = {
  mode: mode,
  target: target,
  entry: "./src/main.js",
  output: {
    filename: "[contenthash].bundle.js",
    path: __dirname + "/build",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: "@import './src/styles/main.scss';",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      "process.env": JSON.stringify(process.env),
    }),
  ],

  devtool: isProd ? "source-map" : "cheap-module-source-map",
  devServer: {
    static: {
      directory: __dirname + "/build",
    },
    open: true,
    port: 1000,
    historyApiFallback: true,
  },
};

export default config;
