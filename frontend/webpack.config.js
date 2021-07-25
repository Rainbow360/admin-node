const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 配置环境
    mode: 'development',

    devtool: 'source-map',

    // 配置入口
    entry: {
        'js/app': './src/app.js'
    },

    // 配置出口
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.art$/,
                use: {
                    loader: 'art-template-loader',
                    options: {
                        // art-template options (if necessary)
                        // @see https://github.com/aui/art-template
                    }
                }
            },
            {
                test: /\.css$/,
                loaders:['style-loader','css-loader']
            }
        ]
    },

    // 配置插件
    plugins: [

        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename:'index.html',
            inject: true
        }),

        new CopyPlugin(
            {
                patterns: [
                  { 
                    from: "./public/*.ico", 
                    to: path.join(__dirname, './dist/favicon.ico') 
                  },
                  { 
                    from: "./public/libs", 
                    to: path.join(__dirname, './dist/libs') 
                  }
                ],
            }
        ),

        new CleanWebpackPlugin(),
    ],

    //配置serve
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 8082,
        proxy: {
            '/api': {
              target: 'http://localhost:3000',
            },
        },
    }
}