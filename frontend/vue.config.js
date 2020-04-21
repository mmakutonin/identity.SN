module.exports = {
    devServer: {
        proxy: {
            '^/api/v1': {
                target: 'http://localhost:1337',
                ws: true,
                changeOrigin: false
            }
        },
    }
}