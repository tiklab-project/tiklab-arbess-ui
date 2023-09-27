const webpack = require("webpack");
const {merge} =require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const customEnv = process.env.CUSTOM_ENV;
const {webpackGlobal} = require("./environment/environment_" + customEnv);
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = merge(baseWebpackConfig,{
    // 指定构建环境
    mode:"development",
    output:{
        path: path.resolve(__dirname, "./dist"),
        filename: "assets/js/[name].[hash].js",
        chunkFilename:"[name][chunkhash].js",
        publicPath: "/",
    },
    devtool: "cheap-module-eval-source-map",
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:"MatFlow",
            template: path.resolve(__dirname, "./public/index.template.html"),
            favicon: path.resolve('./public/matflowIcon.png'),
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
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),
        new MonacoWebpackPlugin(),
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        hot:true,
        compress:true,
        port:3000,
        host: "0.0.0.0",
        historyApiFallback: true,
        disableHostCheck: true,
    }
});

