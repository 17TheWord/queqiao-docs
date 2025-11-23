import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

import eventsV2Sidebar from './config/sidebar/events-v2'
import eventsV1Sidebar from './config/sidebar/events-v1'
import apiV2Sidebar from './config/sidebar/api-v2'
import apiV1Sidebar from './config/sidebar/api-v1'

export default defineUserConfig({
    bundler: viteBundler(),
    plugins: [
        docsearchPlugin({
            appId: "MNY6Z9DZPC",
            apiKey: "dc7a84515bb4d9e5900c264aeb07f350",
            indices: [
                'queqiao_docs_pages_dev_mny6z9dzpc_pages',
                'queqiao_docs_pages_dev_mny6z9dzpc_products',
                'queqiao_docs_pages_dev_mny6z9dzpc_articles'
            ]
        })
    ],
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['meta', { name: 'algolia-site-verification', content: '83F354088192C5B0' }]
    ],
    theme: defaultTheme({
        repo: 'https://github.com/17TheWord/queqiao-docs',
        navbar: [
            { text: '首页', link: '/' },
            { text: '简介', link: '/introduction/' },
            { text: '开始', link: '/start/' },
            { text: '配置', link: '/config/' },
            {
                text: '事件',
                children: [
                    { text: 'V2 事件', link: '/events/v2/' },
                    { text: 'V1 事件', link: '/events/v1/' },
                ]
            },
            {
                text: 'API',
                children: [
                    { text: 'V2 API', link: '/api/v2/' },
                    { text: 'V1 API', link: '/api/v1/' },
                ],
            },
        ],
        sidebar: {
            "/introduction/": "heading",
            "/start/": [
                {
                    text: '快速开始',
                    link: '/start/',
                },
                {
                    text: '详细步骤',
                    link: '/start/steps.md',
                },
            ],
            "/config/": [
                {
                    text: '配置信息',
                    link: '/config/',
                },
                {
                    text: '独立程序额外配置',
                    link: '/config/vanilla.md',
                },
            ],
            '/events/v2/': eventsV2Sidebar,
            "/events/v1/": eventsV1Sidebar,
            "/api/v2/": apiV2Sidebar,
            "/api/v1/": apiV1Sidebar,
        }
    }),
    lang: 'zh-CN',
    title: '鹊桥',
    description: 'Minecraft 服务端 Mod/Plugin，实时接收玩家事件、API广播消息',
})
