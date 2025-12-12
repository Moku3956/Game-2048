const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js', // まとめたファイルの名前
    path: path.resolve(__dirname, 'dist'), // 出力先のフォルダ
    clean: true, // ビルドするたびにdistフォルダをきれいに掃除する設定
  },

  module: {
    rules: [
      {
        test: /\.ts$/, // .ts で終わるファイルに対して
        use: 'ts-loader', 
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'], 
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." }, // publicフォルダの中身をdist直下にコピー
      ],
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // distフォルダの中身をブラウザに表示する
    },
    compress: true,
    port: 8080, 
    hot: true, // ホットリロード
    host: '0.0.0.0'
  },
  devtool: 'inline-source-map',
};