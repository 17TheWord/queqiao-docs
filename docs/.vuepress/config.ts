import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

import sidebar from './config/sidebar'
import navbar from './config/navbar'

export default defineUserConfig({
    bundler: viteBundler(),
    plugins: [
        docsearchPlugin({
            appId: "MNY6Z9DZPC",
            apiKey: "dc7a84515bb4d9e5900c264aeb07f350",
            indices: ['queqiao_docs_pages_dev_mny6z9dzpc_pages'],
        })
    ],
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['meta', { name: 'algolia-site-verification', content: '83F354088192C5B0' }]
    ],
    theme: defaultTheme({
        repo: 'https://github.com/17TheWord/queqiao-docs',
        navbar: navbar,
        sidebar: sidebar,
    }),
    lang: 'zh-CN',
    title: '鹊桥',
    description: 'Minecraft 服务端 Mod/Plugin，实时接收玩家事件、API广播消息',
})
