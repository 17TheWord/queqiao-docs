import type { NavbarOptions } from '@vuepress/theme-default'

export default [
    { text: '首页', link: '/' },
    { text: '介绍', link: '/introduction' },
    { text: '部署', link: '/deploy/' },
    { text: '配置文件', link: '/config/' },
    { text: '命令', link: '/commands' },
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
    {
        text: '常见问题',
        link: '/faq',
    },
    {
        text: '开发',
        children: [
            { text: '标准开发', link: '/development/contributing/standard-dev/' },
            { text: '快速开发', link: '/development/contributing/quick-start/' },
        ]
    },
] as NavbarOptions
