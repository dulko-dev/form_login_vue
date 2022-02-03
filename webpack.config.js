import { dirname } from "path";
import { fileURLToPath } from "url";
import { VueLoaderPlugin } from "vue-loader";
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@vue/babel-preset-app"],
          },
        },
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
              additionalData: "@import './src/styles/main.scss';"
              ,
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
