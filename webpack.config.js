// 引入path
const path = require('path')
// 引入html插件，生成index.html
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件，先清空dist目录，再重新生成
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

// webpack中所有的配置信息
module.exports = {
    // 指定入口文件 
    entry: './src/index.ts',

    // 指定打包文件所在目录
    output: {
        // 指定打包文件目录
        path: path.resolve(__dirname, 'dist'),

        // 打包后的文件
        filename: 'bundle.js',

        // 告诉webpack不使用箭头函数和const
        environment: {
            arrowFunction: false,
            const: false,
        }
    },

    // 指定webpack打包要使用的模块
    module: {
        // 指定加载规则
        rules: [

            {
                // test指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        loader: 'babel-loader',
                        // 设置
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 指定corejs版本
                                        "corejs": "3",
                                        // 使用corejs方式，usage：按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                // 要排除的文件
                exclude: /node_modules/
            },

            // 设置less文件
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",

                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },

                    "less-loader",
                ]
            }

        ]
    },
    // 指定打包模式
    mode: 'production', // Set 'mode' option to 'development' or 'production'

    // 配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            // title: '打包后的项目', // 自定义html title
            template: './src/template.html', // 自定义html模板
        }),
        new CleanWebpackPlugin(),
    ],

    // 设置哪些文件可以作为模块引用
    resolve: {
        extensions: ['.ts', '.js']
    }
}