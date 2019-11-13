const path  = require('path')
const fs  = require('fs')

const proxyHost = 'localhost.com'
const pathContext = '/api/*'

module.exports = {
    productionSourceMap: false,
    // configureWebpack: {
    //     resolve: {
    //         modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')]
    //     }
    // },
    css: {
        extract: true,
        sourceMap: false
    },
    assetsDir: 'assets',   // 静态文件目录
    publicPath: './',    // 编译后的地址，可以根据环境进行设置
    lintOnSave: true, // 是否开启编译时是否不符合eslint提示
     // 配置
    chainWebpack: (config) => {
        // 配置别名
        // config.resolve.alias
        //     .set('@', resolve('src'))
        //     .set('assets',resolve('src/assets'))
        //     .set('components',resolve('src/components'))
        //     .set('router',resolve('src/router'))
        //     .set('utils',resolve('src/utils'))
        //     .set('static',resolve('src/static'))
        //     .set('store',resolve('src/store'))
        //     .set('views',resolve('src/views'));

         // 压缩代码
        config.optimization.minimize(true);

        // 分割代码
        config.optimization.splitChunks({
          chunks: 'all'
        });

        // 用cdn方式引入
        // config.externals({
        //   'vue': 'Vue',
        //   'vuex': 'Vuex',
        //   'vue-router': 'VueRouter',
        //   'element-ui': 'MINT',
        //   'axios': 'axios'
        // })
    },
    devServer: {
        proxy: {
            [pathContext]: {
                target: 'http://' + proxyHost,
                secure: false,
                changeOrigin: true,
                bypass(req, res, proxyOptions) {
                    if (fs.existsSync(path.join(__dirname, 'mock', 'match.rules.js'))) {
                        // 实时读取，更改mock配置后不用重启webpack
                        let map = fs.readFileSync( path.join(__dirname, 'mock', 'match.rules.js'), 'utf-8')
                        map = map .replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '') .trim()
                        console.log(req.url)
                        if (map) {
                            console.log(map);
                            map = JSON.parse(map)[0]
                            for (let x in map) {
                                if (req.url.indexOf(x) > -1) {
                                    console.log(
                                        'mapped local:',
                                        path.join( __dirname, 'mock', map[x] ).replace(/\\/g, '/')
                                    )
                                    res.sendFile(
                                        path.join(__dirname, 'mock', map[x])
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
