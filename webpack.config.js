const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BabelMultiTargetPlugin = require("webpack-babel-multi-target-plugin")
  .BabelMultiTargetPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const getConfig = (opt) => ({
  context: path.join(__dirname, "src"),
  entry: {
    main: "./index.tsx",
  },
  mode: opt.mode,
  devServer: opt.devServer,
  output: {
    path: path.join(__dirname, "dist"),
    filename: `static/js/[name].[hash].js`,
    chunkFilename: `static/js/[name].[hash].bundle.js`,
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
              name: "static/assets/[path][name].[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [BabelMultiTargetPlugin.loader()],
      },
      ...opt.rules,
    ],
  },
  optimization: opt.optimization,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      inject: "body",
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer",
    }),

    new BabelMultiTargetPlugin({
      babel: {
        plugins: [
          "@babel/plugin-proposal-class-properties",
          [
            "@babel/plugin-transform-react-jsx",
            {
              pragma: "plusnew.createElement",
              pragmaFrag: "plusnew.Fragment",
              throwIfNamespace: false,
            },
          ],
          [
            "@babel/plugin-transform-typescript",
            {
              onlyRemoveTypeImports: true,
              isTSX: true,
              jsxPragma: "plusnew",
            },
          ],
        ],
      },
      targets: {
        modern: {
          tagAssetsWithKey: false,
        },

        legacy: {
          key: "legacy",
          tagAssetsWithKey: true,
        },
      },
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")],
    }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(__dirname, "tsconfig.json"),
    }),

    ...opt.plugins,
  ],
});

module.exports = (env) => {
  const plugins = [];
  const rules = [];

  const opt = {
    mode: env.mode,
    devServer:
      env.mode === "development"
        ? {
            port: 3000,
            clientLogLevel: "info",
            historyApiFallback: true,
            proxy: {
              "/api": {
                target: "https://conduit.productionready.io",
                changeOrigin: true,
              },
            },
          }
        : undefined,
    plugins,
    rules,
    optimization:
      env.mode === "test"
        ? {
            splitChunks: undefined,
          }
        : {
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
  };

  return getConfig(opt);
};
