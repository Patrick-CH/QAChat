const proxyObj = {}
proxyObj['/api'] = {
    target: 'http://124.223.80.199',
    changeOrigin: true,
    ws: true, //是否代理 websockets
    pathRewrite: {
        '^/api': ''
    }
}
module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        proxy: proxyObj
    }
}


// const proxyObj = {}
// proxyObj['/api'] = {
//     target: 'http://10.138.67.222:8080/',
//     changeOrigin: true,
//     ws: true, //是否代理 websockets
//     pathRewrite: {
//         '^/api': ''
//     }
// }
// module.exports = {
//         devServer: {
//             host: '0.0.0.0',
//             port: 8080,
//             proxy: proxyObj
//         }
//     }


// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'http://10.138.67.222:8080/', //接口域名
//                 changeOrigin: true, //是否跨域
//                 ws: true, //是否代理 websockets
//                 pathRewrite: { //路径重置
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// };