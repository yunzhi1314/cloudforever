// 安装依赖： webpack sass-loader file-loader style-loader vue-loader
// babel-loader css-loader html-webpack-plugin

// 如何使用去打包? 


// 路径
const path = require('path');
// html的webpack打包配置项
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue的webpack打包配置项
const { VueLoaderPlugin } = require('vue-loader');
// BASE_URL 环境路径配置
const devEnv = require('./src/config/dev.env.js');
const proEnv = require('./src/config/pro.env.js');
// webpack 打包器
const webpack = require('webpack');

module.exports = {
  // 模式： 开发模式 / 生产模式
  mode: 'development', // or 'production',
  // 入口文件
  entry: './src/main.js',
  // 输出对应的文件夹及文件
  output: {
    // 在该文件目录下创建一个名为dist的文件夹
    path: path.resolve(__dirname, 'dist'),
    // 文件名：在名为dist的文件夹内创建一个名为bundle.js的文件
    filename: 'bundle.js',
  },
  // 解析所有已设置的路径下的文件
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue'],
  },
  // 模组
  module: {
    // rules：模组解析规则
    // 一般为数组，每一个对象都为一个对应的解析规则
    rules: [
      {
        test: /\.vue$/,
        // 每一个对象的use都使用到一个扩展依赖
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,

        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  // 额外扩展依赖
  plugins: [
    // 解析html文件的规则
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // 解析vue文件及vue.js的规则
    new VueLoaderPlugin(),
    // 解析环境路径接口的规则
    new webpack.DefinePlugin({
        BASE_URL: process.env.NODE_ENV === 'production' ? proEnv.BASE_URL : devEnv.BASE_URL
      })
  ]
};