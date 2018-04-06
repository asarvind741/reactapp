var path = require('path');
module.exports = {
    entry: './index.js',

    output: {
        path: path.resolve(__dirname ,'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                // loader: 'babel-loader?presets[]=es2015&presets[]=react' 
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },

    devServer: {
        historyApiFallback: true,
    },
}