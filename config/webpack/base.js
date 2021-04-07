const { webpackConfig, merge } = require('@rails/webpacker')

// https://github.com/rails/webpacker/blob/master/CHANGELOG.md
// const nodeModules = require("@rails/webpacker/rules/node_modules.js")
// webpackConfig.loaders.append("nodeModules", nodeModules)

const customConfig = {
  resolve: {
    extensions: [".css", "scss", "sass"]
  },
  devServer: {
    port: 3035
  }
}

module.exports = merge(webpackConfig, customConfig)
