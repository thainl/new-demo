const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [autoprefixer("last 5 versions")],
            }
        },
    },
];

module.exports = {
    mode: "development",
    // mode: "production",
    entry: {
        index: path.resolve(__dirname, "./src/js/index.js"),
        detail: path.resolve(__dirname, "./src/js/detail.js"),
        collections: path.resolve(__dirname, "./src/js/collections.js"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/i,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                        options: {
                            presets: ["latest"],
                        },
                    },
                    {
                        test: /\.tpl$/i,
                        loader: "ejs-loader",
                        options: {
                            esModule: false
                        }
                    },
                    {
                        test: /\.scss$/i,
                        use: [...commonCssLoader, "sass-loader"],
                    },
                    {
                        test: /\.css$/i,
                        use: [...commonCssLoader],
                    },
                    {
                        // 处理通过url引入的图片文件或字体文件
                        test: /\.(png|jpg|jpeg|webp|gif|ico|woff|eot|svg|ttf)$/i,
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: "[name][hash:8].[ext]",
                            outputPath: 'img',
                            publicPath: '/img/',
                            esModule: false,
                        },
                    },
                    {
                        // 处理html结构中的img图片
                        test: /\.html$/i,
                        loader: "html-loader",
                    },
                    {
                        // 处理其他文件
                        exclude: /\.(js|html|css|scss|png|jpg|jpeg|webp|gif|tpl|ico|woff|eot|svg|ttf)$/i,
                        loader: "file-loader",
                        options: {
                            name: "[name][hash:8].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // 混淆js
        // new uglify(),
        // 处理html
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
            filename: "index.html",
            template: path.resolve(__dirname, "./src/index.html"),
            title: "新闻头条",
            chunksSortMode: "manual",
            chunks: ['index'],
            excludeChunks: ['node_modules'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
            filename: "detail.html",
            template: path.resolve(__dirname, "./src/detail.html"),
            title: "新闻详情",
            chunksSortMode: "manual",
            chunks: ['detail'],
            excludeChunks: ['node_modules'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
            filename: "collections.html",
            template: path.resolve(__dirname, "./src/collections.html"),
            title: "我的收藏",
            chunksSortMode: "manual",
            chunks: ['collections'],
            excludeChunks: ['node_modules'],
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    devServer: {
        watchOptions:{
            // 忽略监视的文件
            ignored: /node_modules/,
        },
        // 启用gzip压缩
        compress: true,
        // 端口号
        port: 3002,
        // 域名, 0.0.0.0表示局域网可以访问
        host: '0.0.0.0',
    },
    devtool: 'source-map',
    // devtool: 'hidden-source-map',
    // 优化，禁止压缩 最小化
    optimization: {
        minimize: false
    }
};
