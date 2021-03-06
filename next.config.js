// const webpack = require('webpack');
// require('dotenv').config()
const withFonts = require('next-fonts');
module.exports = withFonts({
  enableSvg: true,
  webpack(config, options) {
    return config;
  }
});

const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const path = require('path');

module.exports = {
  serverRuntimeConfig: { // Will only be available on the server side
    mySecret: 'secret',
  },
  publicRuntimeConfig: { // Will be available on both server and client
    MAP_KEY: process.env.GOOGLE_MAP_KEY,
    APP_URL: process.env.APP_URL,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
                require.resolve('styled-jsx/babel'),
              ]
            }
          },
          'styled-jsx-css-loader',
        ]
      }
    ]
  },
  babelLoader: {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['es2015']
    }
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext].js',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, './.babelrc'),
            },
          },
          'styled-jsx-css-loader',
        ],
      },
    );
    return config;
  },
};
