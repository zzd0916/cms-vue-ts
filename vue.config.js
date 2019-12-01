module.exports = {
    devServer : {
        open: true,
        host: '0.0.0.0',
        port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://yapi.jjmou.cn/mock/10/ts/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {}
    }
}