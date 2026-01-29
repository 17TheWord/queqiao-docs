export default [
    {
        text: '总览',
        link: '/events/v2/',
    },
    {
        text: '消息事件',
        children: [
            { text: 'PlayerChatEvent', link: '/events/v2/message/player-chat-event.md' },
            { text: 'PlayerCommandEvent', link: '/events/v2/message/player-command-event.md' },
        ],
    },
    {
        text: '通知事件',
        children: [
            { text: 'PlayerJoinEvent', link: '/events/v2/notice/player-join-event.md' },
            { text: 'PlayerQuitEvent', link: '/events/v2/notice/player-quit-event.md' },
            { text: 'PlayerDeathEvent', link: '/events/v2/notice/player-death-event.md' },
            { text: 'PlayerAchievementEvent', link: '/events/v2/notice/player-achievement-event.md' },
        ],
    },
    {
        text: '其他模型',
        children: [
            { text: 'Player', link: '/events/v2/model/player.md' },
            { text: 'Translate', link: '/events/v2/model/translate.md' },
        ],
    },
]
