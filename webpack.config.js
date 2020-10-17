const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['@babel/plugin-transform-runtime'],
          },
        }],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${SRC_DIR}/index.html`,
          to: `${DIST_DIR}/index.html`,
        },
        {
          from: `${SRC_DIR}/images/pink-star.png`,
          to: `${DIST_DIR}/images/pink-star.png`,
        },
      ],
    }),
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
};
