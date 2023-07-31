const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    // Entry point for files
    entry: { //./src/js/index.js
      main: './client/src/js/index.js',
      install: './client/src/js/install.js'
    },
    // Output for bundles
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Webpack plugin to generate the html file and inject the bundles
    plugins: [ 
      //! Add and configure workbox plugins for a service worker and manifest file.
      new HtmlWebpackPlugin({
        template: './client/src/index.html',
        chunks: ['main'],
        filename: 'index.html',
        title: 'Just Another Text Editor',
      }),
      new HtmlWebpackPlugin({
        template: './client/src/install.html',
        chunks: ['install'],
        filename: 'install.html',
        title: 'Install J.A.T.E',
      }),
     
      // Injects the custom service worker
      new InjectManifest({
        swSrc: './client/src-sw.js',
        swDest: './client/src-sw.js',
      }),

      // Create a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Create notes or code snippets with or without an internet connection',
        background_color: '#225ca3', // can change
        theme_color: '#225ca3', // can change 
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      //! Add CSS loaders and babel to webpack.
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader to transpile ES6
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};  
