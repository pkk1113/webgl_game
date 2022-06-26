const path = require('path');

module.exports = {
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // 출력파일
    output: {
        filename: 'bundle.js',
        // 출력되는 절대위치
        path: path.resolve(__dirname, 'dist'),
        // bundle.js가 제공 될 웹 서버 의 가상 디렉토리를 지정합니다
        // 웹사이트에서 볼 때, host:port/dist/bundle.js 로 보인다.
        // 출처: https://webpack.kr/guides/development/#using-webpack-dev-server
        publicPath: '/dist',
    },
    devServer: {
        // index.html이 존재하는 위치를 알려주면 됩니다.
        static: {
            directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 'auto',
    },
}