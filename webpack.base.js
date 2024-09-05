const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const customEnv = process.env.CUSTOM_ENV;
const {webpackGlobal} = require("./environment/environment_" + customEnv);
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

const sassModuleRegex = /\.module\.(scss|sass)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isDevelopment && "style-loader",
        !isDevelopment && {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: "../",
            },
        },
        {
            loader: "css-loader",
            options: cssOptions,
        },
        {
            loader: "postcss-loader",
            options: {
                sourceMap: !isDevelopment ,
            },
        },
    ].filter(Boolean);

    if (preProcessor) {
        // 默认配置
        let loaderOptions = {
            sourceMap: true,
        };
        loaders.push(
            {
                loader: preProcessor,
                options: loaderOptions,
            },
        );
    }
    return loaders;
};

module.exports = {
    output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[hash:8].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
            "@src": path.join(__dirname, "./src"),
        },
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    // loader: "happypack/loader?id=portal"
                    loader: "babel-loader"
                }],
                exclude: /node_modules/
            },
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                    sourceMap: !isDevelopment ,
                }),
                sideEffects: true,
            },
            {
                test: cssModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                    sourceMap: !isDevelopment ,
                    modules: {
                        localIdentName: "[local]--[hash:base64:5]",
                    },
                }),
            },
            {
                test: sassRegex,
                exclude: sassModuleRegex,
                use: getStyleLoaders(
                    {
                        importLoaders: 3,
                        sourceMap: !isDevelopment ,
                    },
                    "sass-loader",
                ),
                sideEffects: true,
            },
            {
                test: sassModuleRegex,
                use: getStyleLoaders(
                    {
                        importLoaders: 3,
                        sourceMap: !isDevelopment ,
                        modules: {
                            localIdentName: "[local]--[hash:base64:5]",
                        },
                    },
                    "sass-loader",
                ),
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                exclude: /\.(png|jpg|jpeg|gif).js/,
                // exclude: /node_modules/,
                use: {
                    loader: "url-loader",
                    options: {
                        // publicPath: "images",
                        outputPath: "images/",
                        name: "[name].[ext]", // 图片输出的路径
                        limit: 8*1024,
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].min.[ext]",
                            limit: 5000, // fonts file portal <= 5KB, use "base64"; else, output svg file
                            outputPath: "fonts/",
                        }
                    }
                ]
            },
            {
                test: /\.(svg)/,
                exclude: /\.(svg).js/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "images/",
                        name: "[name].[ext]", // 图片输出的路径
                        limit: 8*1024,
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:"Arbess",
            template: path.resolve(__dirname, "./public/index.template.html"),
            favicon: path.resolve('./public/arbess.png'),
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
    ]
};

