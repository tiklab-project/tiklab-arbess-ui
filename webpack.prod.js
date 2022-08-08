const { merge } = require("webpack-merge");
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const baseWebpackConfig = require("./webpack.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const optimizeCss = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const customEnv = process.env.CUSTOM_ENV;
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {webpackGlobal} = require("./enviroment/enviroment_" + customEnv);
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    entry: [
        path.resolve(__dirname, "./src/index.js")
    ],
    plugins: [
        new optimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:"matFlow",
            template: path.resolve(__dirname, "./public/index.template.html"),
            hash: false,
            filename: "index.html",
            inject: "body",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin({ENV:JSON.stringify(customEnv), ...webpackGlobal}),
        new CompressionPlugin({
            filename: "[path].gz[query]", // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: "gzip", // 算法
            test: new RegExp("\\.(js|css|sass|scss)$"), // 压缩 js 与 css
            threshold: 10240, // 只处理比这个值大的资源。按字节计算
            minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),
        new ProgressBarPlugin(),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        nodeEnv: process.env.NODE_ENV,
        splitChunks: {
            chunks: "all",
            minSize: 30000, ////默认值，超过30K才独立分包
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests:1,
            automaticNameDelimiter: "--", // 分包打包生成文件的名称的连接符
            name:false,
            cacheGroups: { //  cacheGroups 缓存组，如：将某个特定的库打包
                antIcon: {
                    name: "chunk-antIcon",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true //遇到重复包直接引用，不重新打包
                },
                tiklabPluginUI: {
                    name: "chunk-tiklab-plugin-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-plugin-ui[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                tiklabUserUI: {
                    name: "chunk-tiklab-user-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-user-ui[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                tiklabCoreUI: {
                    name: "chunk-tiklab-core-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-core-ui[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                tiklabEamUI: {
                    name: "chunk-tiklab-eam-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-eam-ui[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                tiklabPrivilegeUI: {
                    name: "chunk-tiklab-privilege-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-privilege-ui[\\/]/,
                    priority: 70,
                    reuseExistingChunk: true
                },
                mobx: {
                    name: "chunk-mobx",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]mobx[\\/]/,
                    priority: 80,
                    reuseExistingChunk: true
                },
                mobxReact: {
                    name: "chunk-mobx-react",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]mobx-react[\\/]/,
                    priority: 80,
                    reuseExistingChunk: true
                },
                echarts: {
                    name: "chunk-echarts",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]echarts[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                codemirror: {
                    name: "chunk-codemirror",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]codemirror[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                reactCodemirror2: {
                    name: "chunk-react-codemirror2",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]react-codemirror2[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                moment: {
                    name: "chunk-moment",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    priority: 50,
                    reuseExistingChunk: true
                },
                antdUI: {
                    name: "chunk-antdUI",
                    chunks: "async",
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    priority: 90,
                    reuseExistingChunk: true
                },
                icon: {
                    name: "chunk-icon",
                    chunks: "all",
                    test: /[\\/]src[\\/]font-icon[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true
                },
                /* 提取共用部分，一下提取的部分会议commons 命名 */
                commons: {
                    name: "commons",
                    test: function (module, chunks) {
                        if (
                            /src\/components\//.test(module.context) ||
                            /src\/util\//.test(module.context) ||
                            /react/.test(module.context) ||
                            /react-dom/.test(module.context) ||
                            /redux/.test(module.context)
                        ) {
                            return true
                        }
                    },
                    chunks: "all",
                    minChunks: 2, //  提取公共部分最少的文件数
                    // minportal: 0 // 提取公共部分最小的大小
                    // enforce: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({  // 压缩js
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        // 去除console.log ,debugger
                        drop_console: true,
                        drop_debugger: true,
                    },
                }
            })
        ]
    },
});

