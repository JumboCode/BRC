//const webpack = require('webpack');
//require('dotenv').config()

const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
var path = require('path');

module.exports = {
    serverRuntimeConfig: { // Will only be available on the server side
        mySecret: 'secret',
    },
    publicRuntimeConfig: { // Will be available on both server and client
        MAP_KEY: process.env.GOOGLE_MAP_KEY,
        APP_URL: process.env.APP_URL
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
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
            'styled-jsx-css-loader'
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
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        }
      );
      return config;
    }
};
