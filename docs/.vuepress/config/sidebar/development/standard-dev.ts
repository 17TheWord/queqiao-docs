export default [
    {
        text: '标准开发',
        link: '/development/contributing/standard-dev/',
    },
    {
        text: '新增版本模块',
        link: '/development/contributing/standard-dev/new-version',
    },
    {
        text: '主类',
        link: '/development/contributing/standard-dev/main-class',
    },
    {
        text: '事件监听器',
        link: '/development/contributing/standard-dev/event-listener',
    },
    {
        text: 'utils',
        collapsible: true,
        children: [
            { text: '工具包', link: '/development/contributing/standard-dev/utils/tool' },
        ]
    },
    {
        text: 'handle',
        collapsible: true,
        children: [
            { text: 'API 处理实现', link: '/development/contributing/standard-dev/handle/api' },
            { text: '命令返回信息实现', link: '/development/contributing/standard-dev/handle/command-return' },
        ]
    },
    {
        text: '命令',
        link: '/development/contributing/standard-dev/commands',
    }
]
