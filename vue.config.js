const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
    publicPath: BASE_URL,
    outputDir: 'dist',
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'tabs-card-gutter': '0px'
                },
                javascriptEnabled: true
            }
        }
    },
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('api', resolve('src/api'))
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: ' http://localhost:8081/',
                ws: true,
                changeOrigin: true
            },
            '/uploadpath': {
                target: ' http://localhost:8081/',
                ws: true,
                changeOrigin: true
            }
        }
    }
}