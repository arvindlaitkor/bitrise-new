const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const appVersion = require('./package.json').version;

// PostCSS plugins
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssSvgo = require('postcss-svgo');
const postcssCalc = require('postcss-calc');

const isDev = process.env.NODE_ENV === 'development' || false;
const sourcePath = path.resolve(__dirname, 'src');
const nodeModules = path.resolve(__dirname, 'node_modules');

// HTML templates for HtmlWebpackPlugin
const htmlTemplates = {
  app: {
    template: 'src/shared/template/index.html',
    chunks: ['app'],
    filename: 'index.html',
  },
};

module.exports = {

  devtool: isDev ? 'eval-source-map' : null,

  entry: isDev ? {
    app: path.resolve(__dirname, 'src/index.js'),
    dev1: 'webpack/hot/dev-server',
    dev2: 'webpack-dev-server/client?http://localhost:8080',
  } : {
    app: path.resolve(__dirname, 'src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name]-[hash:6].js',
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: sourcePath,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        include: sourcePath,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'url-loader?limit=300000&mimetype=image/png',
      },
      {
        test: /\.woff|woff2|otf$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]-[hash:6].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  postcss() {
    return [
      precss,
      postcssCalc,
      postcssSvgo,
      autoprefixer({
        browsers: ['last 2 versions', 'IE > 9'],
      }),
    ];
  },

  plugins: isDev ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_VERSION: JSON.stringify(`${appVersion} DEV`),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\\\]locale$/, /en/),
    new CopyWebpackPlugin([{ from: 'src/shared/images', to: 'images/' }]),
    new HtmlWebpackPlugin(htmlTemplates.app),
  ] : [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_VERSION: JSON.stringify(appVersion),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.ContextReplacementPlugin(/moment[/\\\\]locale$/, /en/),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new FaviconsWebpackPlugin({
      logo: './src/shared/icons/appicon.png',
      prefix: 'favicon/',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new CopyWebpackPlugin([{ from: 'src/shared/images', to: 'images/' }]),
    new HtmlWebpackPlugin(htmlTemplates.app),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: [nodeModules, sourcePath],
  },

  devServer: {
    port: 8080,
    contentBase: sourcePath,
    historyApiFallback: true,
    colors: true,
    inline: isDev,
    compress: !isDev,
    hot: isDev,
    host: '0.0.0.0',
    noInfo: true,
  },
};
