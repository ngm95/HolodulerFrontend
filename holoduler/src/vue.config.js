module.exports = {
    devServer: {
        proxy: {
            '/': {
                "target": 'http://localhost:9000/',
                "pathRewrite": { '^/': '' },
                "changeOrigin": true,
                "secure": false
            }
    
        }
    }
}