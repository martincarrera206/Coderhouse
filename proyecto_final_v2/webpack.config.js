import path from 'path'
import nodeExternals from 'webpack-node-externals'

export default {
    mode: 'production',
    entry: './src/main.ts',
    target: "node",
    externals: [nodeExternals()],

    output: {
        path: path.resolve('.', 'build'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts?/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}
