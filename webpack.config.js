const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = "development";
if (process.env.NODE_ENV === "production") {
    mode = "production";
}

function getPlugins() {
    const plugins = [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: process.env.SERVE ? "[name].css" : "[name].[contenthash].css",
        }),
    ];

    if (process.env.SERVE) { 
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    return plugins;
}

module.exports = {
    mode,
    entry: ['babel-polyfill', './src/index.js'],
    devtool: "source-map",
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "@src": path.resolve(__dirname, 'src/'),
            "@components": path.resolve(__dirname, 'src/components/'),
            "@reducers": path.resolve(__dirname, 'src/reducers/'),
            "@stores": path.resolve(__dirname, 'src/stores/'),
            "@styles": path.resolve(__dirname, 'src/styles/'),
            "@utils": path.resolve(__dirname, 'src/utils/')
        },
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devServer: {
        hot: true,
    },
    plugins: getPlugins(),
    module: {
        rules: [{
            test: /\.(html)$/,
            exclude: /node_modules/,
            use: ["html-loader"],
        },
        {
            test: /\.(sc|c)ss$/i,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        },
        {
            test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
            type: mode === 'production' ? 'asset' : 'asset/resource',
            },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
        },
        ]
    },
};