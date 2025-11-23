export default [
    {
        text: '总览',
        link: '/api/v1/',
    },
    {
        text: '接口列表',
        children: [
            { text: '广播消息', link: '/api/v1/broadcast.md' },
            { text: '私聊消息', link: '/api/v1/private-message.md' },
            { text: '标题', link: '/api/v1/title.md' },
            { text: 'Actionbar', link: '/api/v1/actionbar.md' },
        ],
    },
    {
        text: '常用对象',
        link: '/api/v1/model.md',
    },
]
