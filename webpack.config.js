'use strict'

const path = require('path')
const glob = require('glob')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Search entry files.
const entries = Object.fromEntries(
  glob
    .globSync('{**/style.scss,**/index.{ts,js}}', {
      cwd: './src',
    })
    .map(function (entryPath) {
      const parsedEntryPath = path.parse(entryPath)
      return [
        path.join(parsedEntryPath.dir, parsedEntryPath.name),
        path.resolve('./src', entryPath),
      ]
    })
)
console.log('Entries:')
console.log(entries)

module.exports = {
  entry: entries,
  output: {
    clean: true,
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'public',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};