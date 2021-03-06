const util = require('util')
module.exports = {
  future: {
    webpack5: true
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // console.log(util.inspect(config.module.rules, undefined, 5))
    // look for .ts config
    for (const rule of config.module.rules) {
      if (rule.test?.exec?.("a.ts")) {
        // exclude .worklet.ts from default configuration
        rule.exclude = [
          rule.exclude,
          /\.worklet\.ts$/
        ]
      }
    }
    config.module.rules.push({
      test: /\.worklet\.ts$/,
      type: "asset/resource",
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-typescript"],
          plugins: ["babel-plugin-remove-import-export"]
        }
      },
      generator: {
        filename: 'static/[contenthash].js[query]'
      }
    }, {
      test: /\.ttf$/,
      type: "asset/inline"
    })
    return config
  },
}