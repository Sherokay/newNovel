module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.pingcc.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/rapi': {
        target: 'http://api.zhuishushenqi.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/rapi': '' }
      }
    }
  }
}
