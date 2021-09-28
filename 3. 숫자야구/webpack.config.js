const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
//노드의 모듈을 만들었다
//웹팩은 스크립트를 너무 많이 사용하는 것을 대체로 하나로 합치기 위해 사용한다
//노드에서는 require를 사용, vue에서는 import를 사용
module.exports = {
    mode: 'development', //개발용 배포용: production
    devtool: 'eval', //테스트 배포용: hidden-source-map
    resolve: {
        extensions: ['.js', 'vue'], //import할 때 확장자를 제거하고 불러낼수 있다.
    },
    //하나로 합쳐질 파일의 이름 app (나중에 app.js로 합쳐짐)
    entry: {
        app: path.join(__dirname, 'main.js'),
    },
    //웹팩의 핵심
    module: {
        //js가 아닌 파일들 처리
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    //내보낼 파일의 이름
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'), //경로
    },
};