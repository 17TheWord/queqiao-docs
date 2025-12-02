# PlayerChatEvent

| 字段名         | 数据类型 | 可能的值        | 说明         |
| :------------- | :------- | :-------------- | :----------- |
| `timestamp`    | `int`    | -               | 事件时间戳   |
| `post_type`    | `str`    | `message`       | 事件类型     |
| `event_name`   | `str`    | `PlayerChatEvent` | 事件名     |
| `server_name`  | `str`    | -               | 服务器名称   |
| `server_version`| `str`   | -               | 服务器版本   |
| `server_type`  | `str`    | -               | 服务器类型   |
| `sub_type`     | `str`    | `player_chat`   | 事件子类型   |
| `message_id`   | `str`    | -               | 消息 ID      |
| `raw_message`  | `str`    | -               | 原始消息内容 |
| `player`       | [`Player`](../model/player.md#player) | -               | 玩家对象     |
| `message`      | `str`    | -               | 消息对象     |

::: tip
可通过以下方式拼接成聊天消息

```python
chat_message = f"[{event.server_name}] {event.player.nickname}：{event.message}"

[Server] 玩家A：你好！
```

:::

## 服务端支持情况

- `raw_message` 字段
  - 在 `vanilla (原版)` 与 `Spigot` 中，均与 `message` 字段相同。
  - 在其他服务端中，为玩家聊天消息的 `Json` 文本组件格式字符串，但如果消息没有使用任何格式化，则与 `message` 字段相同。
  - 例如：玩家发送消息 `Hello`，则 `raw_message` 字段为 `Hello`；玩家发送消息 `&dHello`，则 `raw_message` 字段可能为 `{"text":"Hello","color":"light_purple"}`（暂未测试）。
