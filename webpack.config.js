/* eslint-disable no-var, strict, prefer-arrow-callback */
"use strict";

var path = require("path");
var webpack = require("webpack");

var babelOptions = {
    "presets": [
        "react", [
            "es2015", {
                "modules": false
            }
        ],
        "es2016"
    ]
};

module.exports = {
    cache: true,
    entry: {
        main: "./public/ts/bootstrap.tsx",
        vendor: [
            "babel-polyfill",
            "jquery",
            "moment",
            "fbemitter",
            "flux",
            "react",
            "react-dom",
            "react-bootstrap",
            "react-router",
            "react-router-bootstrap",
            "toastr"
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist/public/scripts"),
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    options: babelOptions
                },
                {
                    loader: "ts-loader"
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    options: babelOptions
                }
            ]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            "jQuery": "jquery",
            "$": "jquery"
        })
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }
};
