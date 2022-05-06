
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');//压缩css
const path = require('path');

const DIST_PATH = path.resolve(__dirname, 'dist');
const envData_dev = require(`./enviroment/enviroment_${process.env.API_ENV}`);


const threadLoader = require('thread-loader');
const jsWorkerPool = {
    // options

    // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
    // 当 require('os').cpus() 是 undefined 时，则为 1
    workers: 5,
    poolTimeout: 2000
};

const cssWorkerPool = {
// 一个 worker 进程中并行执行工作的数量
// 默认为 20
    workerParallelJobs: 2,
    poolTimeout: 2000
};
threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader',"sass-loader",'sass-resources-loader']);
module.exports = {
    output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        path: DIST_PATH,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            react: path.resolve('./node_modules/react')
        },
    },
    target: "web",
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: jsWorkerPool
                    },
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'thread-loader',
                        options: cssWorkerPool
                    },

                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: './src/index.scss'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // publicPath: 'images',
                        outputPath: 'images/',
                        name: '[name].[ext]', // 图片输出的路径
                        limit: 8*1024,
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file portal <= 5KB, use 'base64'; else, output svg file
                            outputPath: 'fonts/',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:'流水线',
            template: path.resolve(__dirname, './public/index.template.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin(envData_dev),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            // chunkFilename: 'css/[id].css',
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),
    ]
};
