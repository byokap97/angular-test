var webpack = require('webpack');

var config = {
    context: __dirname + '/src', // `__dirname` is root of project and `src` is source
    entry: {
        app: './app.js',
    },
    devServer: {
        open: true, // to open the local server in browser
        contentBase: __dirname + '/src',
        https:true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"

          },
      
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        filename: '[name].bundle.js',
    }
};

module.exports = config;