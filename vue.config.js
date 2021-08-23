
const BASE_URL = 'http://10.4.64.148:8888' // 请按实际服务地址进行替换

module.exports = {
  // outputDir: outputDir,  //设置构建文件目录
  // 生产环境的 source map
  productionSourceMap: false,

  // 本地运行时代理设置
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '/welding': {
        target: BASE_URL,
        ws: false, // websocket 代理
        secure: false, // https,则设置为true
        changeOrigin: true, // 是否跨域
        pathRewirte: {
          '^/welding': '/welding'
        }
      },
      '/device': {
        target: BASE_URL,
        ws: false, // websocket 代理
        secure: false, // https,则设置为true
        changeOrigin: true, // 是否跨域
        pathRewirte: {
          '^/device': '/device'
        }
      }
    }
  }
}
