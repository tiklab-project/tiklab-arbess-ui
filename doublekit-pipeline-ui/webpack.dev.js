/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:04:03
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-31 09:49:07
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin  = require('terser-webpack-plugin');
const PORT = 3004;

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    mode:'development',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://127.0.0.1:${PORT}/`,
        path.resolve(__dirname, './src/index.js')
    ],
    optimization:{
        namedModules: true,
        namedChunks: true,
        runtimeChunk: {
            name: 'runtime'
        },
        minimize: false,
        minimizer: [new TerserPlugin()],
        splitChunks:
            {
                name: false,
                chunks: 'all',
                // minportal: 1,
                minChunks: 1,
                cacheGroups:
                    {
                        default: false,
                        vendors:
                            {
                                name: 'common',
                                chunks: 'all',
                                minChunks: 2,
                                test: /node_modules/
                            },
                        styles:
                            {
                                name: 'common',
                                chunks: 'all',
                                minChunks: 2,
                                test: /\.(css|less|scss|stylus)$/,
                                enforce: true,
                                priority: 50
                            }
                    }
            }
    },

    devServer: {
        contentBase: path.join(__dirname, 'plugin'), //开发服务运行时的文件根目录
        port:PORT,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '127.0.0.1',
        hotOnly:true,
        stats: {
            children: false,
        },
        disableHostCheck:true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
