export default [
    {
        text: '快速开发',
        link: '/development/quick-start/',
    },
    {
        text: '主类编写',
        link: '/development/quick-start/main-class',
    },
    {
        text: '事件监听',
        link: '/development/quick-start/event-listener',
    },
    {
        text: 'utils',
        collapsible: true,
        children: [
            { text: '工具包', link: '/development/quick-start/utils/tool' },
        ]
    },
    {
        text: 'handle',
        collapsible: true,
        children: [
            { text: 'API 处理实现', link: '/development/quick-start/handle/api' },
            { text: '命令返回信息实现', link: '/development/quick-start/handle/command-return' },
        ]
    },
    {
        text: '命令',
        link: '/development/quick-start/commands',
    }
]