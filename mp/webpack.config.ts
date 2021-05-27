let path = require('path');
let HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    //项目入口
    entry: "./src/main.ts",
    //输出设置
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    //调试工具
    devtool: "source-map",
    //模块加载器设置
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ],
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
        ]
    },
    //调试服务
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 7777
    },
    //插件
    plugins: [
        new HtmlWebPackPlugin(
            {
                title: "threeBubble"
            }),
    ]
}

function __dirname(__dirname: any, arg1: string) {
    throw new Error("Function not implemented.");
}
function resolve(arg0: string) {
    throw new Error("Function not implemented.");
}

