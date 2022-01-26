import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { VueLoaderPlugin } from "vue-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: "development",

  entry: "./src/main.js",
  output: {
    filename: "[contenthash].bundle.js",
    path: __dirname + "/build",
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],

  devtool: isProd ? "source-map" : "cheap-module-source-map",
  devServer: {
    static: {
      directory: __dirname + "/build",
    },
    open: true,
    port: 1000,
  },
};

export default config;
