const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  devServer: {
    inline: true,
    contentBase: "./public",
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              /*
                To get tree shaking working, we need the `modules: false` below.

                https://goo.gl/4vZBSr - 2ality blog mentions that the issue is caused
                by under-the-hood usage of `transform-es2015-modules-commonjs`.

                https://goo.gl/sBmiwZ - A comment on the above post shows that we
                can use `modules: false`.
              */
              [
                '@babel/preset-env', // https://goo.gl/aAxYAq
                {
                  modules: false, // Needed for tree shaking to work (see above).
                  useBuiltIns: 'entry' // https://goo.gl/x16mAq
                }
              ],
              '@babel/preset-react' // https://goo.gl/4aEFV3
            ],

            // https://goo.gl/N9gaqc - List of Babel plugins.
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve('public/index.html'),
      filename: "./index.html",
      favicon: path.resolve('public/favicon.ico'),
    })
  ]
};