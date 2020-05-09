const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = (env) => ({
  context: path.join(__dirname, "src"),
  entry: ["./index.tsx"],
  mode: env.mode,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash].bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsConfigPathsPlugin()],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|woff2?|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        default: {
          minChunks: 1,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      inject: "head",
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer",
    }),
  ],

  devServer:
    env.mode === "development"
      ? {
          port: 3000,
          clientLogLevel: "info",
          historyApiFallback: true,
        }
      : undefined,
});
