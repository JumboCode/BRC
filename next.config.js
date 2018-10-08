//const webpack = require('webpack');
//require('dotenv').config()

const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = {
    serverRuntimeConfig: { // Will only be available on the server side
        mySecret: 'secret',
    },
    publicRuntimeConfig: { // Will be available on both server and client
        MAP_KEY: process.env.GOOGLE_MAP_KEY

    }
};

