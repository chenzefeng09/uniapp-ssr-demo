const path = require("path");
const webpack = require("webpack");
const fs = require('fs')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const compiler = require('vue-template-compiler')
compiler.ssrCompile = compiler.compile 

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  configureWebpack: {
    entry: './src/entry-server.js',
    target: 'node',
    output: {
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new VueSSRServerPlugin()
    ]
  }
};
