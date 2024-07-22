const {merge} =require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base");

module.exports = merge(baseWebpackConfig,{
    // 指定构建环境
    mode:"development",
    devtool: "cheap-module-eval-source-map",
    plugins:[

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

