// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    devServer: {
        open: true,
        host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new VueLoaderPlugin(),
        // Add your plugins here
        // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [{
                test: /\\.(js|jsx)$/,
                loader: 'babel-loader',
            },{
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },{
                test: /\.vue$/,
                use: 'vue-loader'
            },{
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: 'asset',
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }],
    },
};
