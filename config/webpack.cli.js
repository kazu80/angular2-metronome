var webpack = require ('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
var helpers = require ('./helpers');

module.exports = {

    entry: {
        sass : './src/entry-cli.js'
    },


    output: {
        path : './src/css',
        filename : 'styles.css'
    },


    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin ('styles.css')
    ]

};