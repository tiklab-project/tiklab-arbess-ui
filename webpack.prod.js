const { merge } = require("webpack-merge");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const baseWebpackConfig = require("./webpack.base");
const optimizeCss = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    entry: [
        path.resolve(__dirname, "./src/index.js")
    ],
    devtool: "inline-source-map",
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
        new ProgressBarPlugin(),
        new BundleAnalyzerPlugin(),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn|es/,
        ),
    ],
    optimization: {
        minimize: true,
        nodeEnv: process.env.NODE_ENV,
        splitChunks: {
            chunks: "all",
            minSize: 30000, // 默认值，超过30K才独立分包
            minChunks: 1,
            maxAsyncRequests: 7,
            maxInitialRequests: 5,
            automaticNameDelimiter: "--", // 分包打包生成文件的名称的连接符
            name:false,
            cacheGroups: { //  cacheGroups 缓存组，如：将某个特定的库打包
                lodash: {
                    name: "chunk-lodash",
                    chunks:"all",
                    test: /lodash/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                thoughtwareUserUI: {
                    name: "chunk-thoughtware-user-ui",
                    chunks: "all",
                    test: /thoughtware-user-ui/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwareLicenceUI: {
                    name: "chunk-thoughtware-licence-ui",
                    chunks: "all",
                    test: /thoughtware-licence-ui/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwareEamUI: {
                    name: "chunk-thoughtware-eam-ui",
                    chunks: "all",
                    test: /thoughtware-eam-ui/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                thoughtwareSecurityUI: {
                    name: "chunk-thoughtware-security-ui",
                    chunks: "all",
                    test: /thoughtware-security-ui/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwareMessageUI: {
                    name: 'chunk-thoughtware-message-ui',
                    chunks: 'all',
                    test: /thoughtware-message-ui/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwarePrivilegeUI: {
                    name: 'chunk-thoughtware-privilege-ui',
                    chunks: 'all',
                    test: /thoughtware-privilege-ui/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                moment: {
                    name: "chunk-moment",
                    chunks: "all",
                    test: /moment/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                echarts: {
                    name: "chunk-echarts",
                    chunks: "all",
                    test: /echarts/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                codemirror: {
                    name: "chunk-codemirror",
                    chunks: "all",
                    test: /codemirror/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                zrender:{
                    name: "chunk-zrender",
                    chunks: "all",
                    test: /zrender/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                antIcon: {
                    name: 'chunk-antIcon',
                    chunks: 'all',
                    test: /@ant-design/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                rcomponent: {
                    name: "chunk-rcomponent",
                    chunks: "all",
                    test: /(rc-[a-zA-Z])/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                antdUI: {
                    name: 'chunk-antdUI',
                    chunks: 'all',
                    test: /antd/,
                    priority: 3,
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
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
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
