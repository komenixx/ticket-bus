const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, '/src/Bus.ts'),
    output: {
        filename: 'index.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: __dirname + '/src/IBus.d.ts', to: __dirname + '/dist/index.d.ts' }
        ])
    ]
};
