const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all",
        },
    };

    if (isProd) {
        config.minimizer = [new TerserWebpackPlugin()];
    }

    return config;
};

function plugins() {
    const plugins = [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: isProd ? "[name].css" : "[name].[contenthash].css",
            })
        );
    }

    return plugins;
}

module.exports = {
    mode: "development",
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: isDev ? "source-map" : false,
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            "@src": path.resolve(__dirname, "src/"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@store": path.resolve(__dirname, "src/store/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@pages": path.resolve(__dirname, "src/pages/"),
            "@services": path.resolve(__dirname, "src/services/"),
            "@app": path.resolve(__dirname, "src/app/"),
        },
    },
    optimization: optimization(),
    devServer: {
        hot: isDev,
        historyApiFallback: true,
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                use: ["html-loader"],
            },
            {
                test: /\.(sc|c)ss$/i,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
