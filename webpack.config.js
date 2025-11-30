const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js', // まとめたファイルの名前
    path: path.resolve(__dirname, 'dist'), // 出力先のフォルダ
    clean: true, // ビルドするたびにdistフォルダを一度きれいに掃除する設定
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

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // distフォルダの中身をブラウザに表示する
    },
    compress: true,
    port: 8080, // http://localhost:8080 でアクセスできる
    hot: true, // ホットリロード
  },
  devtool: 'inline-source-map',
};